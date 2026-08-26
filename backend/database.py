from sqlalchemy import create_engine
from dotenv import load_dotenv
from pathlib import Path
from urllib.parse import quote_plus
import os

# Load .env from backend folder
load_dotenv(Path(__file__).parent / ".env")

db_user = os.getenv("DB_USER")
db_password = quote_plus(os.getenv("DB_PASSWORD", ""))
db_host = os.getenv("DB_HOST")
db_port = os.getenv("DB_PORT", "4000")
db_name = os.getenv("DB_NAME")

DB_URL = (
    f"mysql+pymysql://{db_user}:{db_password}"
    f"@{db_host}:{db_port}/{db_name}"
)

engine = create_engine(
    DB_URL,
    pool_pre_ping=True
)