// =========================
// HISTORY MANAGER
// =========================

let historyQueries =
JSON.parse(
localStorage.getItem("queryHistory")
) || [];

function saveHistory(question){

    historyQueries.unshift(question);

    historyQueries =
    [...new Set(historyQueries)];

    if(historyQueries.length>8){

        historyQueries.pop();

    }

    localStorage.setItem(
        "queryHistory",
        JSON.stringify(historyQueries)
    );

    renderHistory();

}

function renderHistory(){

    const list =
    document.getElementById("historyList");

    if(!list) return;

    list.innerHTML="";

    historyQueries.forEach(query=>{

        const li =
        document.createElement("li");

        li.textContent=query;

        li.onclick=()=>{

            questionBox.value=query;

            generateQuery();

        };

        list.appendChild(li);

    });

}

document
.getElementById("clearHistory")
?.addEventListener("click",()=>{

    historyQueries=[];

    localStorage.removeItem(
        "queryHistory"
    );

    renderHistory();

});