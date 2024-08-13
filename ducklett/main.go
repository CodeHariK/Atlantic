package main

import (
	"context"
	"database/sql"
	"fmt"
	"log"
	"time"

	"github.com/codeharik/Atlantic/sandslash/service"
	_ "github.com/marcboeker/go-duckdb"
)

var db *sql.DB

type user struct {
	name    string
	age     int
	height  float32
	awesome bool
	bday    time.Time
}

func main() {
	var err error

	db, err = sql.Open("duckdb", "./duck.db?access_mode=READ_WRITE")
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	check(db.Ping())

	setting := db.QueryRowContext(context.Background(), "SELECT current_setting('access_mode')")
	var am string
	check(setting.Scan(&am))
	log.Printf("DB opened with access mode %s", am)

	check(db.ExecContext(context.Background(), "INSTALL postgres;"))
	check(db.ExecContext(context.Background(), "LOAD postgres;"))
	config := service.LoadConfig("config.json", "../config/config.json")
	check(db.ExecContext(
		context.Background(),
		fmt.Sprintf("ATTACH '%s' AS postgres_db (TYPE POSTGRES, READ_ONLY);", config.DatabaseConnectionUri())))

	check(db.ExecContext(context.Background(), "CREATE TABLE IF NOT EXISTS users(name VARCHAR, age INTEGER, height FLOAT, awesome BOOLEAN, bday DATE)"))
	check(db.ExecContext(context.Background(), "INSERT INTO users VALUES('marc', 99, 1.91, true, '1970-01-01')"))
	check(db.ExecContext(context.Background(), "INSERT INTO users VALUES('macgyver', 70, 1.85, true, '1951-01-23')"))

	rows, err := db.QueryContext(
		context.Background(), `
		SELECT name, age, height, awesome, bday
		FROM users
		WHERE (name = ? OR name = ?) AND age > ? AND awesome = ?`,
		"macgyver", "marc", 30, true,
	)
	check(err)
	defer rows.Close()

	for rows.Next() {
		u := new(user)
		err := rows.Scan(&u.name, &u.age, &u.height, &u.awesome, &u.bday)
		if err != nil {
			log.Fatal(err)
		}
		log.Printf(
			"%s is %d years old, %.2f tall, bday on %s and has awesomeness: %t\n",
			u.name, u.age, u.height, u.bday.Format(time.RFC3339), u.awesome,
		)
	}
	check(rows.Err())

	res, err := db.ExecContext(context.Background(), "DELETE FROM users")
	check(err)

	ra, _ := res.RowsAffected()
	log.Printf("Deleted %d rows\n", ra)

	runTransaction()
	testPreparedStmt()

	printAllTables()
	printCategories()
}

func check(args ...interface{}) {
	err := args[len(args)-1]
	if err != nil {
		panic(err)
	}
}

func runTransaction() {
	log.Println("Starting transaction...")
	tx, err := db.Begin()
	check(err)

	check(
		tx.ExecContext(
			context.Background(),
			"INSERT INTO users VALUES('gru', 25, 1.35, false, '1996-04-03')",
		),
	)
	row := tx.QueryRowContext(context.Background(), "SELECT COUNT(*) FROM users WHERE name = ?", "gru")
	var count int64
	check(row.Scan(&count))
	if count > 0 {
		log.Println("User Gru was inserted")
	}

	log.Println("Rolling back transaction...")
	check(tx.Rollback())

	row = db.QueryRowContext(context.Background(), "SELECT COUNT(*) FROM users WHERE name = ?", "gru")
	check(row.Scan(&count))
	if count > 0 {
		log.Println("Found user Gru")
	} else {
		log.Println("Couldn't find user Gru")
	}
}

func testPreparedStmt() {
	stmt, err := db.PrepareContext(context.Background(), "INSERT INTO users VALUES(?, ?, ?, ?, ?)")
	check(err)
	defer stmt.Close()

	check(stmt.ExecContext(context.Background(), "Kevin", 11, 0.55, true, "2013-07-06"))
	check(stmt.ExecContext(context.Background(), "Bob", 12, 0.73, true, "2012-11-04"))
	check(stmt.ExecContext(context.Background(), "Stuart", 13, 0.66, true, "2014-02-12"))

	stmt, err = db.PrepareContext(context.Background(), "SELECT * FROM users WHERE age > ?")
	check(err)

	rows, err := stmt.QueryContext(context.Background(), 1)
	check(err)
	defer rows.Close()

	for rows.Next() {
		u := new(user)
		err := rows.Scan(&u.name, &u.age, &u.height, &u.awesome, &u.bday)
		if err != nil {
			log.Fatal(err)
		}
		log.Printf(
			"%s is %d years old, %.2f tall, bday on %s and has awesomeness: %t\n",
			u.name, u.age, u.height, u.bday.Format(time.RFC3339), u.awesome,
		)
	}
}

func printAllTables() {
	// Query to show all tables
	rows, err := db.QueryContext(context.Background(), "SHOW ALL TABLES;")
	if err != nil {
		panic(err)
	}
	defer rows.Close()

	// Iterate through the result set
	fmt.Printf("Tables in the database:\n")
	for rows.Next() {
		var column1, column2, column3, column4, column5, column6 any
		err := rows.Scan(&column1, &column2, &column3, &column4, &column5, &column6)
		if err != nil {
			log.Fatal(err)
		}
		// Adjust this print statement based on the actual columns returned
		// fmt.Println(column1, column2, column3, column4, column5, column6)
		fmt.Println(column1, column3)
	}

	// Check for errors from iterating over rows
	if err := rows.Err(); err != nil {
		panic(err)
	}
}

func printCategories() {
	query := `SELECT * from product_category LIMIT 3;`

	rows, err := db.QueryContext(context.Background(), fmt.Sprintf("SELECT * FROM postgres_query('postgres_db', '%s');", query))
	if err != nil {
		panic(err)
	}
	defer rows.Close()

	columnTypes, err := rows.ColumnTypes()
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Column Types:")
	for _, col := range columnTypes {
		fmt.Printf("Name: %s, Type: %s\n", col.Name(), col.DatabaseTypeName())
	}

	fmt.Println("Tables in the database:")
	for rows.Next() {
		var id sql.NullInt64
		var name sql.NullString
		var parentID sql.NullInt64

		err := rows.Scan(&id, &name, &parentID)
		if err != nil {
			log.Fatal(err)
		}

		// Handle NULL values
		idValue := "NULL"
		if id.Valid {
			idValue = fmt.Sprintf("%d", id.Int64)
		}

		nameValue := "NULL"
		if name.Valid {
			nameValue = name.String
		}

		parentIDValue := "NULL"
		if parentID.Valid {
			parentIDValue = fmt.Sprintf("%d", parentID.Int64)
		}

		fmt.Printf("ID: %s, Name: %s, Parent ID: %s\n", idValue, nameValue, parentIDValue)
	}

	// Check for errors from iterating over rows
	if err := rows.Err(); err != nil {
		log.Fatal(err)
	}
}
