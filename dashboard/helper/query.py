import duckdb

from dataclasses import dataclass, fields
import pandas as pd
import re
from typing import Type, List, Dict, Any, TypeVar

# Define a TypeVar to represent any dataclass type
T = TypeVar("T", bound=dataclass)


def execute_query(
    conn: duckdb.DuckDBPyConnection, query: str, params: Dict[str, Any]
) -> duckdb.DuckDBPyRelation:
    """
    Executes a SQL query with parameters on a DuckDB connection.

    :param conn: The DuckDB connection object.
    :param query: The SQL query with placeholders for parameters.
    :param params: A dictionary of parameters to replace in the query.
    :return: A DuckDBPyRelation object representing the result of the query.
    """
    # Clean up the query and replace placeholders with parameter values
    query = query.replace("\\", "")
    for key, value in params.items():
        # Check if the value is a string and add single quotes
        if isinstance(value, str):
            value = f"'{value}'"
        query = re.sub(f":{key}", str(value), query)

    # Execute the query and return the result
    return conn.sql(f"""
    SELECT * FROM postgres_query("postgres_db", 
        "{query}"
    );
    """)


def convert_row_to_dataclass(row: pd.Series, dataclass_type: Type[T]) -> T:
    """
    Convert a DataFrame row to a dataclass instance using reflection.

    :param row: A pandas Series representing a row in the DataFrame.
    :param dataclass_type: The dataclass type to convert the row to.
    :return: An instance of the specified dataclass type.
    """
    # Extract field names from the dataclass
    field_names = {field.name for field in fields(dataclass_type)}

    # Prepare arguments for the dataclass constructor
    kwargs = {field: row[field] for field in field_names if field in row}

    # Create and return an instance of the dataclass
    return dataclass_type(**kwargs)


def convert_dataframe_to_dataclass(
    df: pd.DataFrame, dataclass_type: Type[T]
) -> List[T]:
    """
    Convert a DataFrame to a list of dataclass instances.

    :param df: The DataFrame to convert.
    :param dataclass_type: The dataclass type to convert the DataFrame rows to.
    :return: A list of dataclass instances.
    """
    # Apply conversion function to each row in the DataFrame
    dataclass_rows = df.apply(
        lambda row: convert_row_to_dataclass(row, dataclass_type), axis=1
    )

    # Convert the resulting Series to a list
    return list(dataclass_rows)
