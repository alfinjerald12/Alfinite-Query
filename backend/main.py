from fastapi import FastAPI
from sqlalchemy import text
from fastapi.middleware.cors import CORSMiddleware

from backend.database import engine
from backend.groq_service import generate_sql, explain_sql
from backend.sql_validator import validate_sql
from backend.query_executor import execute_query
from backend.analytics import get_dashboard_data

app = FastAPI()

# -----------------------------
# CORS
# -----------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://127.0.0.1:5500",
        "http://localhost:5500",
        "https://alfinite-query.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------------
# HOME
# -----------------------------

@app.get("/")
def home():

    return {
        "message": "Text-to-SQL Agent Running"
    }

# -----------------------------
# DATABASE TEST
# -----------------------------

@app.get("/test-db")
def test_db():

    with engine.connect() as conn:

        result = conn.execute(
            text("SELECT * FROM employee")
        )

        data = [dict(row._mapping) for row in result]

    return data

# -----------------------------
# SQL GENERATOR
# -----------------------------

@app.get("/generate-sql")
def get_sql(question: str):

    sql_query = generate_sql(question)

    explanation = explain_sql(sql_query)

    return {

        "question": question,

        "generated_sql": sql_query,

        "explanation": explanation

    }

# -----------------------------
# QUERY EXECUTION
# -----------------------------

@app.get("/query")
def query_database(question: str):

    sql_query = generate_sql(question)

    if not validate_sql(sql_query):

        return {

            "status": "blocked",

            "generated_sql": sql_query,

            "message": "Unsafe query detected"

        }

    results = execute_query(sql_query)

    explanation = explain_sql(sql_query)

    return {

        "status": "success",

        "generated_sql": sql_query,

        "results": results,

        "explanation": explanation

    }

# -----------------------------
# ANALYTICS
# -----------------------------

@app.get("/analytics")
def analytics():

    return get_dashboard_data()