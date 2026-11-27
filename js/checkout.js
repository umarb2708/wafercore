(function () {
    var config = window.WAFERCORE_YOUPI || {};
    var scriptPromise = null;

    function courseById(id) {
        var list = window.WAFERCORE_COURSES || [];
        for (var i = 0; i < list.length; i++) {
            if (list[i].id === id) {
                return list[i];
            }
        }
        return null;
    }

    function inr(amount) {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0
        }).format(amount);
    }

    function originOk(value) {
        try {
            var url = new URL(value);
            if (url.protocol === "https:") {
                return true;
            }
            return url.protocol === "http:" && (url.hostname === "localhost" || url.hostname === "127.0.0.1");
        } catch (error) {
            return false;
        }
    }

    function gatewayReady() {
        var key = String(config.publicKey || "");
        return config.enabled === true &&
            originOk(config.checkoutOrigin) &&
            key.length > 0 &&
            key.indexOf("YOUR_MERCHANT") === -1;
    }

    function checkoutOrigin() {
        return String(config.checkoutOrigin || "").replace(/\/+$/, "");
    }

    function loadGateway() {
        if (window.Youpi && typeof window.Youpi.pay === "function") {
            return Promise.resolve(window.Youpi);
        }
        if (scriptPromise) {
            return scriptPromise;
        }
        scriptPromise = new Promise(function (resolve, reject) {
            var script = document.createElement("script");
            script.src = checkoutOrigin() + "/youpi.js";
            script.async = true;
            script.setAttribute("data-youpi-key", config.publicKey);
            script.setAttribute("data-currency", config.currency || "INR");
            script.onload = function () {
                if (window.Youpi && typeof window.Youpi.pay === "function") {
                    resolve(window.Youpi);
                    return;
                }
                reject(new Error("YOUPI checkout script loaded without Youpi.pay."));
            };
            script.onerror = function () {
                scriptPromise = null;
                reject(new Error("Could not load youpi.js from " + checkoutOrigin()));
            };
            document.head.appendChild(script);
        });
        return scriptPromise;
    }

    function ensureModal() {
        if (document.getElementById("enroll-modal")) {
            return;
        }
        var wrap = document.createElement("div");
        wrap.id = "enroll-modal";
        wrap.className = "enroll-modal";
        wrap.hidden = true;
        wrap.innerHTML =
            '<div class="enroll-dialog" role="dialog" aria-modal="true" aria-labelledby="enroll-title">' +
                '<button type="button" class="enroll-close" aria-label="Close">&times;</button>' +
                '<p class="enroll-kicker">Professional course</p>' +
                '<h2 id="enroll-title"></h2>' +
                '<p class="enroll-price"></p>' +
                '<form id="enroll-form">' +
                    '<label>Full name<input name="name" type="text" autocomplete="name" required minlength="2"></label>' +
                    '<label>Email<input name="email" type="email" autocomplete="email" required></label>' +
                    '<label>Mobile<input name="phone" type="tel" inputmode="numeric" autocomplete="tel" required placeholder="10-digit mobile"></label>' +
                    '<p class="enroll-note" id="enroll-note"></p>' +
                    '<button type="submit" class="btn" id="enroll-submit">Continue to payment</button>' +
                "</form>" +
                '<div class="enroll-result" id="enroll-result" hidden></div>' +
            "</div>";
        document.body.appendChild(wrap);

        wrap.addEventListener("click", function (event) {
            if (event.target === wrap) {
                closeModal();
            }
        });
        wrap.querySelector(".enroll-close").addEventListener("click", closeModal);
        wrap.querySelector("#enroll-form").addEventListener("submit", onSubmit);
        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape" && !wrap.hidden) {
                closeModal();
            }
        });
    }

    function modal() {
        return document.getElementById("enroll-modal");
    }

    function openModal(course) {
        ensureModal();
        var box = modal();
        box.dataset.courseId = course.id;
        box.querySelector("#enroll-title").textContent = course.name;
        box.querySelector(".enroll-price").textContent = inr(course.price);
        box.querySelector("#enroll-form").hidden = false;
        box.querySelector("#enroll-result").hidden = true;
        var note = box.querySelector("#enroll-note");
        var submit = box.querySelector("#enroll-submit");
        if (gatewayReady()) {
            note.textContent = "You will pay " + inr(course.price) + " in the YOUPI checkout window. A seat is confirmed after WaferCore matches the payment with the bank record.";
            submit.textContent = "Continue to payment";
        } else {
            note.textContent = "Online payment is not switched on yet. Submit this form to email an enrollment request to WaferCore.";
            submit.textContent = "Email enrollment request";
        }
        box.hidden = false;
        document.body.classList.add("modal-open");
        box.querySelector("input[name='name']").focus();
    }

    function closeModal() {
        var box = modal();
        if (!box) {
            return;
        }
        box.hidden = true;
        document.body.classList.remove("modal-open");
    }

    function showResult(html) {
        var box = modal();
        box.querySelector("#enroll-form").hidden = true;
        var result = box.querySelector("#enroll-result");
        result.hidden = false;
        result.innerHTML = html;
    }

    function phoneDigits(value) {
        var digits = String(value || "").replace(/\D/g, "");
        if (digits.length === 12 && digits.indexOf("91") === 0) {
            digits = digits.slice(2);
        }
        return digits;
    }

    function orderId(course) {
        return "WC-" + course.id + "-" + Date.now().toString(36);
    }

    function statusUrl(params) {
        var root = document.body.getAttribute("data-root") || "";
        var query = new URLSearchParams(params);
        return root + "order-status.html?" + query.toString();
    }

    function onSubmit(event) {
        event.preventDefault();
        var box = modal();
        var course = courseById(box.dataset.courseId);
        if (!course) {
            return;
        }
        var form = event.currentTarget;
        var name = form.name.value.trim();
        var email = form.email.value.trim();
        var phone = phoneDigits(form.phone.value);
        if (!/^[6-9]\d{9}$/.test(phone)) {
            form.phone.setCustomValidity("Enter a 10-digit Indian mobile number.");
            form.phone.reportValidity();
            return;
        }
        form.phone.setCustomValidity("");

        if (!gatewayReady()) {
            var subject = "Course enrollment: " + course.name;
            var body = [
                "Name: " + name,
                "Email: " + email,
                "Mobile: " + phone,
                "Course: " + course.name,
                "Category: " + course.category,
                "Fee: " + inr(course.price)
            ].join("\n");
            var mailto = "mailto:" + (config.supportEmail || "info@wafercore.com") +
                "?subject=" + encodeURIComponent(subject) +
                "&body=" + encodeURIComponent(body);
            showResult(
                "<h3>Enrollment request ready</h3>" +
                "<p>Online checkout is waiting for the YOUPI gateway settings in <code>js/youpi-config.js</code>. Email this request and the team will share payment steps.</p>" +
                '<a class="btn" href="' + mailto + '">Email ' + (config.supportEmail || "info@wafercore.com") + "</a>"
            );
            return;
        }

        var details = {
            orderId: orderId(course),
            amount: course.price.toFixed(2),
            name: name,
            email: email,
            phone: phone,
            metadata: {
                courseId: course.id,
                courseName: course.name,
                category: course.category,
                studentName: name,
                studentEmail: email,
                studentPhone: phone
            }
        };

        var submit = box.querySelector("#enroll-submit");
        submit.disabled = true;
        submit.textContent = "Opening checkout…";

        loadGateway().then(function (youpi) {
            closeModal();
            youpi.pay({
                order_id: details.orderId,
                amount: course.price,
                currency: config.currency || "INR",
                name: config.storeName || "WaferCore",
                description: course.name,
                customer: {
                    name: name,
                    email: email,
                    phone: phone
                },
                metadata: details.metadata,
                handler: function (response) {
                    var status = response && response.status ? response.status : "SUBMITTED";
                    window.location.href = statusUrl({
                        order_id: (response && response.order_id) || details.orderId,
                        course: course.name,
                        amount: String(course.price),
                        status: status,
                        utr: (response && response.utr) || ""
                    });
                }
            });
        }).catch(function () {
            showResult(
                "<h3>Checkout could not open</h3>" +
                "<p>The YOUPI script at " + checkoutOrigin() + "/youpi.js did not load. Confirm the checkout host is reachable and that YOUPI_ALLOWED_ORIGINS includes this site.</p>"
            );
        }).finally(function () {
            submit.disabled = false;
            submit.textContent = "Continue to payment";
        });
    }

    function renderStatus() {
        var mount = document.getElementById("order-status");
        if (!mount) {
            return;
        }
        var params = new URLSearchParams(window.location.search);
        var status = (params.get("status") || "").toUpperCase();
        var order = params.get("order_id") || "—";
        var course = params.get("course") || "—";
        var amount = params.get("amount");
        var utr = params.get("utr") || "—";
        var copy = {
            SUCCESS: "The checkout window reported a completed session. This screen does not confirm that the bank received the fee.",
            OBSERVED_SUCCESS: "YOUPI reported a matching bank alert. WaferCore still matches the amount and UTR to the statement before confirming your seat.",
            RECONCILED: "YOUPI reported a statement match. WaferCore will confirm the seat from the gateway admin record, not from this browser page.",
            FAILED: "The checkout window reported that this attempt did not complete. No seat has been reserved.",
            EXPIRED: "The payment window expired. You can enroll again from the course page.",
            CANCELLED: "The checkout was closed before payment. No seat has been reserved.",
            SUSPICIOUS: "YOUPI held this attempt for review. Wait for WaferCore to contact you before paying again."
        };
        var title = status ? "Checkout update" : "No checkout result";
        var message = copy[status] || "If you finished a payment, keep the UTR from your UPI app. WaferCore confirms enrollment from the YOUPI admin and the receiving bank account.";

        mount.innerHTML =
            "<h1>" + title + "</h1>" +
            "<p class='status-lead'>" + message + "</p>" +
            "<dl class='status-list'>" +
                "<div><dt>Order</dt><dd>" + escapeText(order) + "</dd></div>" +
                "<div><dt>Course</dt><dd>" + escapeText(course) + "</dd></div>" +
                "<div><dt>Amount</dt><dd>" + (amount ? inr(Number(amount)) : "—") + "</dd></div>" +
                "<div><dt>Reported status</dt><dd>" + escapeText(status || "Not supplied") + "</dd></div>" +
                "<div><dt>UTR</dt><dd>" + escapeText(utr) + "</dd></div>" +
            "</dl>" +
            '<a class="btn" href="courses.html">Back to courses</a>';
    }

    function escapeText(value) {
        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;");
    }

    document.addEventListener("click", function (event) {
        var button = event.target.closest(".btn-enroll");
        if (!button) {
            return;
        }
        var course = courseById(button.getAttribute("data-course-id"));
        if (course) {
            openModal(course);
        }
    });

    document.addEventListener("DOMContentLoaded", function () {
        renderStatus();
        window.addEventListener("youpi:payment:result", function (event) {
            var detail = event.detail || {};
            if (!detail.order_id || document.getElementById("order-status")) {
                return;
            }
            var courseName = detail.metadata && detail.metadata.courseName ? detail.metadata.courseName : "";
            window.location.href = statusUrl({
                order_id: detail.order_id,
                course: courseName,
                amount: detail.amount_received ? String(detail.amount_received) : "",
                status: detail.status || "",
                utr: detail.utr || ""
            });
        });
    });
})();
