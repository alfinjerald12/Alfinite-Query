from sqlalchemy import text
from backend.database import engine

def execute_query(sql_query):

    with engine.connect() as conn:

        result = conn.execute(
            text(sql_query)
        )

        data = [
            dict(row._mapping)
            for row in result
        ]

    return data