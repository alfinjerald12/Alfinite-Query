// =========================
// UTILITIES
// =========================

function sleep(ms){

    return new Promise(resolve =>
        setTimeout(resolve, ms)
    );

}

function clearOutput(){

    if(typeof sqlOutput !== "undefined"){

        sqlOutput.textContent = "";

    }

    if(typeof tableContainer !== "undefined"){

        tableContainer.innerHTML = "";

    }

}