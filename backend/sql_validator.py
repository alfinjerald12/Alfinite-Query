FORBIDDEN = [
    "DROP",
    "DELETE",
    "UPDATE",
    "ALTER",
    "TRUNCATE",
    "INSERT",
    "CREATE"
]

def validate_sql(sql_query):

    sql_upper = sql_query.upper()

    for keyword in FORBIDDEN:

        if keyword in sql_upper:
            return False

    if not sql_upper.strip().startswith("SELECT"):
        return False

    return True