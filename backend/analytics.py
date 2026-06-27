from sqlalchemy import text
from backend.database import engine


def get_dashboard_data():

    with engine.connect() as conn:

        total_employees = conn.execute(
            text("SELECT COUNT(*) FROM employee")
        ).scalar()

        average_salary = conn.execute(
            text("SELECT AVG(salary) FROM employee")
        ).scalar()

        highest_salary = conn.execute(
            text("SELECT MAX(salary) FROM employee")
        ).scalar()

        lowest_salary = conn.execute(
            text("SELECT MIN(salary) FROM employee")
        ).scalar()

        department_count = conn.execute(
            text("SELECT COUNT(DISTINCT dept) FROM employee")
        ).scalar()

        department_distribution = conn.execute(
            text("""
                SELECT
                    dept,
                    COUNT(*) AS total
                FROM employee
                GROUP BY dept
            """)
        ).mappings().all()

        salary_by_department = conn.execute(
            text("""
                SELECT
                    dept,
                    ROUND(AVG(salary),2) AS avg_salary
                FROM employee
                GROUP BY dept
            """)
        ).mappings().all()

    return {

        "total_employees": total_employees,

        "average_salary": average_salary,

        "highest_salary": highest_salary,

        "lowest_salary": lowest_salary,

        "department_count": department_count,

        "department_distribution": department_distribution,

        "salary_by_department": salary_by_department

    }