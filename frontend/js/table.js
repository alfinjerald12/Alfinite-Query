// =========================
// TABLE RENDERER
// =========================

function renderTable(results){

    if(!results || results.length===0){

        tableContainer.innerHTML="<p>No Results Found</p>";

        return;

    }

    let html="<table>";

    html+="<tr>";

    Object.keys(results[0]).forEach(key=>{

        html+=`<th>${key}</th>`;

    });

    html+="</tr>";

    results.forEach((row,index)=>{

        html+=`
        <tr
        style="
        opacity:0;
        animation:
        fadeRow .5s ease forwards;
        animation-delay:${index*.15}s;
        ">
        `;

        Object.values(row).forEach(value=>{

            html+=`<td>${value}</td>`;

        });

        html+="</tr>";

    });

    html+="</table>";

    tableContainer.innerHTML=html;
    setLatestResults(results);
    setChartData(results);

}