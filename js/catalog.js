(function () {
    var root = document.body.getAttribute("data-root") || "";

    function text(value) {
        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;");
    }

    function inr(amount) {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0
        }).format(amount);
    }

    function courses() {
        return window.WAFERCORE_COURSES || [];
    }

    function byTrack(trackId) {
        return courses().filter(function (course) {
            return course.track === trackId;
        });
    }

    function renderTracks() {
        var mount = document.getElementById("track-list");
        if (!mount || !window.WAFERCORE_TRACKS) {
            return;
        }

        mount.innerHTML = window.WAFERCORE_TRACKS.map(function (track) {
            var list = byTrack(track.id);
            var lowest = list.reduce(function (min, course) {
                return Math.min(min, course.price);
            }, Infinity);
            var from = list.length ? inr(lowest) : "";

            return (
                '<a class="track-tile" href="' + root + track.href + '">' +
                    '<span class="track-icon"><i class="fas ' + text(track.icon) + '"></i></span>' +
                    '<h3>' + text(track.title) + "</h3>" +
                    "<p>" + text(track.summary) + "</p>" +
                    '<div class="track-meta">' +
                        "<span>" + list.length + " courses</span>" +
                        "<span>From " + from + "</span>" +
                    "</div>" +
                    '<span class="track-link">View courses <i class="fas fa-arrow-right"></i></span>' +
                "</a>"
            );
        }).join("");
    }

    function renderCatalog() {
        var mount = document.getElementById("course-list");
        if (!mount) {
            return;
        }

        var list = byTrack(mount.getAttribute("data-track"));
        if (!list.length) {
            mount.innerHTML = '<p class="empty-catalog">No courses are listed in this category yet.</p>';
            return;
        }

        var groups = [];
        var index = {};
        list.forEach(function (course) {
            if (!index[course.category]) {
                index[course.category] = { name: course.category, items: [] };
                groups.push(index[course.category]);
            }
            index[course.category].items.push(course);
        });

        var multiple = groups.length > 1;
        mount.innerHTML = groups.map(function (group) {
            var cards = group.items.map(function (course) {
                return (
                    '<article class="course-card">' +
                        '<span class="course-pill">' + text(course.category) + "</span>" +
                        "<h3>" + text(course.name) + "</h3>" +
                        "<p>" + text(course.summary) + "</p>" +
                        '<div class="course-foot">' +
                            '<strong class="course-price">' + inr(course.price) + "</strong>" +
                            '<button type="button" class="btn btn-enroll" data-course-id="' + text(course.id) + '">Enroll</button>' +
                        "</div>" +
                    "</article>"
                );
            }).join("");

            if (!multiple) {
                return '<div class="course-grid">' + cards + "</div>";
            }

            return (
                '<div class="course-group">' +
                    "<h2>" + text(group.name) + "</h2>" +
                    '<div class="course-grid">' + cards + "</div>" +
                "</div>"
            );
        }).join("");
    }

    function setupNav() {
        var toggle = document.querySelector(".nav-toggle");
        var links = document.querySelector(".nav-links");
        if (!toggle || !links) {
            return;
        }
        toggle.addEventListener("click", function () {
            var open = links.classList.toggle("is-open");
            toggle.setAttribute("aria-expanded", open ? "true" : "false");
        });
    }

    document.addEventListener("DOMContentLoaded", function () {
        renderTracks();
        renderCatalog();
        setupNav();
    });
})();
