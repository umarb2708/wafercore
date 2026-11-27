/*
 * WaferCore — YOUPI PG public checkout settings.
 *
 * GitHub Pages can only host this website. It cannot run the YOUPI gateway.
 * Host YOUPI PG (https://github.com/youpi-pg/YouPI-PG) on your own server,
 * then fill in the two values below and set enabled to true.
 *
 * Put only the publishable merchant key here. Never put the merchant API key,
 * webhook secret, admin token, or bank credentials in this file.
 *
 * YOUPI PG is an experimental self-hosted project. It is not a bank-approved
 * or NPCI-approved payment gateway. Confirm a payment in YOUPI admin against
 * your bank statement before you treat an enrollment as paid.
 */
window.WAFERCORE_YOUPI = {
    enabled: false,
    checkoutOrigin: "https://pay.wafercore.com",
    publicKey: "YOUR_MERCHANT_PUBLIC_KEY",
    currency: "INR",
    storeName: "WaferCore",
    supportEmail: "info@wafercore.com"
};
