// =========================
// TYPEWRITER ENGINE
// =========================

async function typeWriter(element, text, speed = 18) {

    element.textContent = "";

    for (let i = 0; i < text.length; i++) {

        element.textContent += text.charAt(i);

        await new Promise(resolve =>
            setTimeout(resolve, speed)
        );

    }

}