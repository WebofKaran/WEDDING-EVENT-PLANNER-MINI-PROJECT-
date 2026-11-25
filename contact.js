"use strict";

// Get selected package
const query = new URLSearchParams(location.search).get("package");

if (query) {
    selected = query.split(",");
}

// Show package
if (selected.length) {
    const panel = $("#contact-package");

    const title = document.createElement("h3");
    title.textContent = "My Package";

    const text = document.createElement("p");
    text.textContent = selected.length + " selections";

    const edit = document.createElement("a");
    edit.href = "custom-service-builder.html";
    edit.textContent = "Edit your package";

    panel.append(title, text, edit);
}

// Set minimum wedding date to today
const date = $('input[name="date"]');
const today = new Date();

date.min =
    today.getFullYear() + "-" +
    String(today.getMonth() + 1).padStart(2, "0") + "-" +
    String(today.getDate()).padStart(2, "0");

// Autofill saved details
const profile = storage.get("elan-profile", null);

if (profile) {
    $('input[name="name"]').value = profile.name || "";
    $('input[name="email"]').value = profile.email || "";
}

// Handle form submission
$("#contact-form").addEventListener("submit", (e) => {
    e.preventDefault();

    const data = new FormData(e.target);

    const name = data.get("name").trim();
    const phone = data.get("phone").trim();
    const weddingDate = data.get("date");
    const message = data.get("message").trim();

    // Validate name
    if (!/^[A-Za-z ]+$/.test(name)) {
        toast("Please enter a valid name.");
        return;
    }

    // Validate phone
    if (!/^[0-9]{10}$/.test(phone)) {
        toast("Please enter a valid 10 digit phone number.");
        return;
    }

    // Validate wedding date
    if (!weddingDate || weddingDate < date.min) {
        toast("Please select a valid wedding date.");
        return;
    }

    // Validate message
    if (!message) {
        toast("Please enter your wedding vision.");
        return;
    }

    // Create enquiry
    const enquiry = `
Name: ${name}
Email: ${data.get("email")}
Phone: ${phone}
Date: ${weddingDate}
City: ${data.get("city")}
Guests: ${data.get("guests")}
Message: ${message}
`;

    // Prepare email
    $("#send-email").href =
        "mailto:everafter@gmail.com?subject=Wedding Enquiry&body=" +
        encodeURIComponent(enquiry);

    $("#enquiry-result").hidden = false;

    toast("Your enquiry is ready!");
});

// Hide result when form changes
$("#contact-form").oninput = () => {
    $("#enquiry-result").hidden = true;
};