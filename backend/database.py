from sqlalchemy import create_engine
from dotenv import load_dotenv
from pathlib import Path
from urllib.parse import quote_plus
import os

# Load .env from backend folder
load_dotenv()

# Read values
db_user = os.getenv("DB_USER")
db_password = quote_plus(os.getenv("DB_PASSWORD", ""))
db_host = os.getenv("DB_HOST")
db_name = os.getenv("DB_NAME")

# Create connection string
DB_URL = (
    f"mysql+pymysql://{db_user}:"
    f"{db_password}@"
    f"{db_host}/"
    f"{db_name}"
)


# Create engine
engine = create_engine(DB_URL)