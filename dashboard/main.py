import duckdb
from helper.config import setup_postgres_connection, find_existing_path
from helper.query import execute_query, convert_dataframe_to_dataclass

def main():
    try:
        conn = duckdb.connect("./duck.db")
        postgres_path = find_existing_path(["../config/config.json", "../config.json"])
        try:
            setup_postgres_connection(conn, postgres_path)
        except:
            return

    except Exception as e:
        print(e)

    print(conn.sql("SHOW ALL TABLES;"))

    from store.product_category import (
        GET_PRODUCT_WITH_CATEGORY_PATH,
        GET_CATEGORY_PATH,
        GetProductWithCategoryPathRow,
    )

    df = execute_query(conn, GET_PRODUCT_WITH_CATEGORY_PATH, {"p1": 1})
    dataclass_list = convert_dataframe_to_dataclass(
        df.df(), GetProductWithCategoryPathRow
    )
    print(df)
    print(dataclass_list)

    import dataclasses

    @dataclasses.dataclass()
    class CategoryPathRow:
        path: str

    df = execute_query(conn, GET_CATEGORY_PATH, {"p1": 3})
    dataclass_list = convert_dataframe_to_dataclass(df.df(), CategoryPathRow)
    print(df)
    print(dataclass_list)


if __name__ == "__main__":
    main()
