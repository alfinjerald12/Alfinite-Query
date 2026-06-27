// =========================
// API SERVICE
// =========================

const BASE_URL = "https://alfinite-query.onrender.com";


async function sendQuery(question, mode){

    const endpoint =

    mode === "restricted"

    ? `${BASE_URL}/query?question=${encodeURIComponent(question)}`

    : `${BASE_URL}/generate-sql?question=${encodeURIComponent(question)}`;


    const response = await fetch(endpoint);


    if(!response.ok){

        throw new Error("Backend Error");

    }


    return await response.json();

}