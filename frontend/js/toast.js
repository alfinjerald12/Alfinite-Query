// =========================
// TOAST MANAGER
// =========================

function showToast(message, type = "success") {

    const toast = document.getElementById("toast");

    toast.textContent = message;

    toast.className = "";

    toast.classList.add("show");

    switch(type){

        case "success":
            toast.style.borderLeft="5px solid #22c55e";
            break;

        case "warning":
            toast.style.borderLeft="5px solid orange";
            break;

        case "error":
            toast.style.borderLeft="5px solid red";
            break;
    }

    setTimeout(()=>{

        toast.classList.remove("show");

    },3000);

}