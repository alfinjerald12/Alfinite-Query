// =========================
// API SERVICE
// =========================

const BASE_URL = "http://127.0.0.1:8000";


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