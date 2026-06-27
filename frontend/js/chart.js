// =============================
// CHART MANAGER
// =============================

let chart = null;

// =============================
// INITIAL PLACEHOLDER
// =============================

document.addEventListener("DOMContentLoaded", () => {

    showPlaceholder();

});

// =============================
// STORE RESULTS
// =============================

function setChartData(results) {

    AppState.latestResults = results;

    visualize(results);

}

// =============================
// TOOLBAR BUTTONS
// =============================

document.querySelectorAll(".chart-btn").forEach(btn => {

    btn.onclick = () => {

        document.querySelectorAll(".chart-btn")
            .forEach(x => x.classList.remove("active"));

        btn.classList.add("active");

        AppState.chartMode = btn.dataset.chart;

        visualize(AppState.latestResults);

    };

});

// =============================
// VISUALIZE
// =============================

const placeholder = document.getElementById("chartPlaceholder");

if(placeholder){

    placeholder.remove();

}

function visualize(results) {

    if (!results || results.length === 0) {

        return;

    }

    if (chart) {

        chart.destroy();

        chart = null;

    }

    const keys = Object.keys(results[0]);

    if (results.length === 1) {

        document.querySelector(".chart-container").innerHTML =
            "<h3 style='text-align:center;margin-top:130px;color:#888;'>No Visualization Available</h3>";

        return;

    }

   const container =
   document.getElementById("chartContainer");

    container.innerHTML =
    '<canvas id="resultChart"></canvas>';

    autoChart(results, keys);

}


// =============================
// CREATE CHART
// =============================

function autoChart(results, keys) {

    const numeric = [];
    const text = [];

    keys.forEach(key => {

        if (typeof results[0][key] === "number") {

            numeric.push(key);

        } else {

            text.push(key);

        }

    });

    const xKey = text.includes("emp_name")
        ? "emp_name"
        : text[0];

    const yKey = numeric.includes("salary")
        ? "salary"
        : numeric[0];

    if (!xKey || !yKey) {

        return;

    }

    const chartType = getChartType(xKey, yKey);

    if (chartType === null) {

        return;

    }

    const labels = results.map(row => row[xKey]);

    const values = results.map(row => row[yKey]);

    const ctx = document
        .getElementById("resultChart")
        .getContext("2d");

    chart = new Chart(ctx, {

        type: chartType,

        data: {

            labels: labels,

            datasets: [{

                label: yKey,

                data: values,

                backgroundColor: "#7c3aed",

                borderRadius: 10

            }]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            plugins: {

                legend: {

                    display: false

                }

            }

        }

    });

}

// =============================
// CHART TYPE DECISION
// =============================

function getChartType(xKey, yKey) {

    // -----------------------------
    // TABLE VIEW
    // -----------------------------

    if (AppState.chartMode === "table") {

        document.querySelector(".chart-container").innerHTML = `

        <div class="table-view-card">

            <div class="table-icon">
                📋
            </div>

            <h2>Table View Enabled</h2>

            <p>
                Interactive charts are currently hidden.
                The query results are displayed in the table above.
            </p>

            <div class="table-tip">
                💡 Switch to <b>Auto</b>, <b>Bar</b>, <b>Pie</b> or <b>Line</b>
                to generate AI-powered visualizations.
            </div>

        </div>

        `;

        return null;

    }

    // -----------------------------
    // USER SELECTED
    // -----------------------------

    if (AppState.chartMode !== "auto") {

        return AppState.chartMode;

    }

    // -----------------------------
    // AI AUTO MODE
    // -----------------------------

    if (xKey === "dept") {

        return "pie";

    }

    if (xKey === "hire_date") {

        return "line";

    }

    return "bar";

}

function showPlaceholder(){

    document.getElementById("chartContainer").innerHTML = `

    <div class="chart-placeholder">

        <div class="placeholder-icon">
            
        </div>

        <h2>Query Visualization</h2>

        <p>No query executed yet.</p>

        <p class="placeholder-sub">

            Ask a question to generate an interactive chart.

        </p>

        <div class="placeholder-tip">

             AI will automatically choose the best visualization.

        </div>

    </div>

    `;

}