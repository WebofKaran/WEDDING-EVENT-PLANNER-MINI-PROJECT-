"use strict";

const query = new URLSearchParams(location.search).get("package");

if (query !== null) {
    selected = [...new Set(query.split(","))].filter((id) =>
        catalog.some((i) => i.id === id)
    );
}

if (selected.length) {
    const panel = $("#contact-package");

    const title = document.createElement("h3");
    title.textContent = "My Package";

    const text = document.createElement("p");
    text.textContent = items().length + " selections · " + money(total());

    const edit = document.createElement("a");
    Object.assign(edit, {
        href: "custom-service-builder.html",
        textContent: "Edit your package"
    });

    panel.append(title, text, edit);
    storage.set("elan-package", selected);
}

const date = $("input[type=date]");
const now = new Date();

date.min =
    now.getFullYear() +
    "-" +
    String(now.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(now.getDate()).padStart(2, "0");

const profile = storage.get("elan-profile", null);

if (profile?.name) {
    $("input[name=name]", $("#contact-form")).value = profile.name;
}

if (profile?.email) {
    $("input[name=email]", $("#contact-form")).value = profile.email;
}

let enquiry = "";

$("#contact-form").addEventListener("submit", (e) => {
    e.preventDefault();

    const data = new FormData(e.target);

    if (
        !String(data.get("name")).trim() ||
        !String(data.get("message")).trim()
    ) {
        toast("Please enter your name and wedding vision.");
        return;
    }

    enquiry =
        "Hello Elan Weddings,\n\n" +
        ["name", "email", "phone", "date", "city", "guests", "message"].map(
            (key) =>
                key.toUpperCase() + ": " + (data.get(key) || "Not decided")
        ).join("\n") +
        "\n\n" +
        (selected.length
            ? estimate()
            : "I would like help creating my wedding package.");

    $("#send-email").href =
        "mailto:everafter@gmail.com?subject=" +
        encodeURIComponent("Wedding enquiry — " + data.get("name")) +
        "&body=" +
        encodeURIComponent(enquiry);

    $("#enquiry-result").hidden = false;

    $("#enquiry-result").scrollIntoView({
        behavior: "smooth",
        block: "nearest"
    });
});

$("#contact-form").oninput = () => {
    $("#enquiry-result").hidden = true;
};

$("#download-enquiry").onclick = () =>
    download("Elan-Wedding-Enquiry.txt", enquiry);