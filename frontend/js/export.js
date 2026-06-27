// =========================
// EXPORT MANAGER
// =========================

AppState.latestResults

function setLatestResults(data){

    latestResults=data;

}

// -------------------------

document
.getElementById("exportJSON")
.addEventListener("click",()=>{

    if(latestResults.length===0){

        showToast("No Data","warning");

        return;

    }

    const blob=new Blob(

        [JSON.stringify(latestResults,null,2)],

        {type:"application/json"}

    );

    const url=

    URL.createObjectURL(blob);

    const a=document.createElement("a");

    a.href=url;

    a.download="results.json";

    a.click();

});

// -------------------------

document
.getElementById("exportCSV")
.addEventListener("click",()=>{

    if(latestResults.length===0){

        showToast("No Data","warning");

        return;

    }

    const headers=

    Object.keys(latestResults[0]);

    let csv=headers.join(",")+"\n";

    latestResults.forEach(row=>{

        csv+=

        headers.map(h=>row[h]).join(",")

        +"\n";

    });

    const blob=

    new Blob([csv],{

        type:"text/csv"

    });

    const url=

    URL.createObjectURL(blob);

    const a=

    document.createElement("a");

    a.href=url;

    a.download="results.csv";

    a.click();

});