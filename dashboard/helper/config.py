import os
import json
from typing import List, Optional

def find_existing_path(paths: List[str]) -> Optional[str]:
    """
    Check a list of file paths and return the first one that exists.

    Args:
    paths (List[str]): List of file paths to check.

    Returns:
    Optional[str]: The first existing file path or None if none exist.
    """
    for path in paths:
        if os.path.exists(path):
            return path
    return None


def create_postgres_dsn(path: str) -> str:
    """
    Create a PostgreSQL DSN from the given configuration file path.

    :param path: Path to the JSON configuration file.
    :return: PostgreSQL DSN string.
    :raises FileNotFoundError: If the configuration file does not exist.
    :raises json.JSONDecodeError: If the configuration file contains invalid JSON.
    :raises KeyError: If expected keys are missing in the configuration.
    """
    try:
        # Load the JSON configuration
        with open(path, "r") as file:
            config = json.load(file)

        # Access the 'database' section
        database_config = config.get("database", {})

        # Extract database configuration with default values
        host = database_config.get("host", "localhost")
        port = database_config.get("port", 5432)
        user = database_config.get("user", "user")
        password = database_config.get("password", "password")
        dbname = database_config.get("dbname", "dbname")
        ssl_mode = database_config.get(
            "ssl_mode", "disable"
        )  # default to 'disable' if not specified

        # Construct the DSN
        dsn = (
            f"postgresql://{user}:{password}@{host}:{port}/{dbname}?sslmode={ssl_mode}"
        )

        return dsn

    except Exception as e:
        raise


def setup_postgres_connection(conn, path: str):
    """
    Set up a PostgreSQL connection in DuckDB.

    :param conn: The DuckDB connection object.
    :param postgres_url: The PostgreSQL DSN URL to attach.
    """
    try:
        conn.execute("INSTALL postgres;")
        conn.execute("LOAD postgres;")
        conn.execute(
            f"ATTACH '{create_postgres_dsn(path)}' AS postgres_db (TYPE POSTGRES, READ_ONLY);"
        )
    except Exception as e:
        print(f"An error occurred while setting up PostgreSQL connection: {e}")
        raise
