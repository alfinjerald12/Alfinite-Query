async function loadDashboard(){

    const response = await fetch(
        "http://127.0.0.1:8000/analytics"
    );

    const data = await response.json();

    document.getElementById("totalEmployees")
    .textContent = data.total_employees;

    document.getElementById("averageSalary")
    .textContent =
    "₹" + Math.round(data.average_salary).toLocaleString();

    document.getElementById("highestSalary")
    .textContent =
    "₹" + data.highest_salary.toLocaleString();

    document.getElementById("departmentCount")
    .textContent =
    data.department_count;

}

loadDashboard();