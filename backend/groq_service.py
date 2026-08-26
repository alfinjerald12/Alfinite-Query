from groq import Groq
from dotenv import load_dotenv
from pathlib import Path
import os

# ==========================
# LOAD ENV
# ==========================

load_dotenv(Path(__file__).parent / ".env")

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)

# ==========================
# GENERATE SQL
# ==========================

def generate_sql(user_question):

    prompt = f"""
You are an expert MySQL SQL Generator.

Your job is to convert Natural Language into valid MySQL queries.

IMPORTANT RULES:

1. Return ONLY SQL.
2. Do NOT explain anything.
3. Do NOT use markdown.
4. Do NOT use ```sql.
5. Use ONLY the schema given below.
6. Never invent table names.
7. Never invent column names.

Database Schema

Table Name:
employee

Columns:

emp_id INT
emp_name VARCHAR
job VARCHAR
salary INT
dept VARCHAR
dep_no INT
hire_date DATE
commission INT

Examples:

Question:
Show all employees

SQL:
SELECT * FROM employee;

Question:
Show all IT employees

SQL:
SELECT *
FROM employee
WHERE dept='IT';

Question:
Show employees whose name starts with A

SQL:
SELECT *
FROM employee
WHERE emp_name LIKE 'A%';

Question:
Show employees whose name contains a

SQL:
SELECT *
FROM employee
WHERE emp_name LIKE '%a%';

Question:
Show all Software Engineers

SQL:
SELECT *
FROM employee
WHERE job='Software Engineer';

Question:
Show employees with salary greater than 80000

SQL:
SELECT *
FROM employee
WHERE salary > 80000;

Question:
Show employees hired after 2023

SQL:
SELECT *
FROM employee
WHERE hire_date > '2023-01-01';

Question:
Show employees ordered by salary

SQL:
SELECT *
FROM employee
ORDER BY salary DESC;

Question:
Count employees in each department

SQL:
SELECT dept,
COUNT(*) AS total_employees
FROM employee
GROUP BY dept;

Question:
Find average salary of each department

SQL:
SELECT dept,
AVG(salary) AS average_salary
FROM employee
GROUP BY dept;

User Question:

{user_question}

SQL:
"""

    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature=0
    )

    sql_query = response.choices[0].message.content

    sql_query = (
        sql_query
        .replace("```sql", "")
        .replace("```", "")
        .strip()
    )

    return sql_query
def explain_sql(sql):

    prompt = f"""
You are an SQL teacher.

Explain this SQL query in simple English.

Maximum 2 short sentences.

SQL:

{sql}
"""

    response = client.chat.completions.create(

        model="llama-3.3-70b-versatile",

        messages=[
            {
                "role":"user",
                "content":prompt
            }
        ]

    )

    return response.choices[0].message.content.strip()