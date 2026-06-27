// =========================
// MAIN CONTROLLER
// =========================

AppState.mode = "restricted";

// =========================
// DOM ELEMENTS
// =========================

const restrictedCard =
document.getElementById("restrictedCard");

const allQueryCard =
document.getElementById("allQueryCard");

const questionBox =
document.getElementById("question");

const generateBtn =
document.getElementById("generateBtn");

const loader =
document.getElementById("loader");

const sqlOutput =
document.getElementById("sqlOutput");

const sqlExplanation =
document.getElementById("sqlExplanation");

const tableContainer =
document.getElementById("tableContainer");

const copyBtn =
document.getElementById("copySQLBtn");

// =========================
// MODE SWITCHING
// =========================

restrictedCard.addEventListener("click", () => {

    AppState.mode = "restricted";

    restrictedCard.classList.add("active-card");
    allQueryCard.classList.remove("active-card");

    // Show Restricted Mode Sections

    document.querySelector(".results-section").style.display = "block";

    document.querySelector(".visualization-section").style.display = "block";

    document.querySelector(".analytics-section").style.display = "block";

});

allQueryCard.addEventListener("click", () => {

    AppState.mode = "all";

    allQueryCard.classList.add("active-card");
    restrictedCard.classList.remove("active-card");

    // Hide Restricted Mode Sections

    document.querySelector(".results-section").style.display = "none";

    document.querySelector(".visualization-section").style.display = "none";

    document.querySelector(".analytics-section").style.display = "none";

});

// =========================
// GENERATE BUTTON
// =========================

generateBtn.addEventListener("click", generateQuery);

// =========================
// MAIN FUNCTION
// =========================

async function generateQuery(){

    const question = questionBox.value.trim();

    if(question===""){

        showToast("Please enter a question.","warning");

        return;

    }

    clearOutput();

    startLoading();

    sqlOutput.innerHTML =
    "<span style='color:#8b5cf6'>AI is thinking...</span>";

    if(sqlExplanation){

        sqlExplanation.innerHTML =
        "<span style='color:#8b5cf6'>Generating explanation...</span>";

    }

    try{

        const data = await sendQuery(
            question,
            AppState.mode
        );

        // Reset Copy Button

        copyBtn.innerHTML = "📋 Copy SQL";

        copyBtn.style.background =
        "linear-gradient(135deg,#7c3aed,#5b21b6)";

        await sleep(300);

        // SQL Typing

        await typeWriter(

            sqlOutput,

            data.generated_sql ||

            "No SQL Generated."

        );

        // AI Explanation Typing

        if(sqlExplanation){

            await typeWriter(

                sqlExplanation,

                data.explanation ||

                "No explanation available."

            );

        }

        // Render Table

        if(AppState.mode==="restricted"){

    renderTable(data.results);

}

        saveHistory(question);

        showToast(

            "SQL Generated Successfully",

            "success"

        );

    }

    catch(error){

        console.error(error);

        showToast(

            "Backend Connection Failed",

            "error"

        );

        sqlOutput.textContent =

        "Connection Failed";

        if(sqlExplanation){

            sqlExplanation.textContent =

            "Unable to generate explanation.";

        }

    }

    finally{

        stopLoading();

    }

}

// =========================
// INITIALIZATION
// =========================

renderHistory();

// =========================
// COPY SQL
// =========================

copyBtn.addEventListener("click", async () => {

    const sql = sqlOutput.textContent.trim();

    if(sql==="" || sql==="Awaiting Query..."){

        showToast(

            "Nothing to copy",

            "warning"

        );

        return;

    }

    try{

        await navigator.clipboard.writeText(sql);

        copyBtn.textContent =

        "✅ SQL Copied";

        copyBtn.style.background =

        "#22c55e";

        showToast(

            "SQL Copied Successfully",

            "success"

        );

    }

    catch(err){

        console.error(err);

        showToast(

            "Copy Failed",

            "error"

        );

    }

});