// =========================
// LOADING MANAGER
// =========================

function startLoading() {

    generateBtn.disabled = true;

    btnText.textContent = "Generating SQL...";

    loader.classList.remove("hidden");

}

function stopLoading() {

    generateBtn.disabled = false;

    btnText.textContent = "Generate SQL";

    loader.classList.add("hidden");

}