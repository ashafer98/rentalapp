package main

import (
    "database/sql"
    "fmt"
    _ "github.com/lib/pq"
    "log"
)

var db *sql.DB

// Initialize the database connection
func initDB() {
    var err error
    db, err = sql.Open("postgres", "user=postgres dbname=rentalApp sslmode=disable password=root")
    if (err != nil) {
        log.Fatal("Failed to connect to the database:", err)
    }

    // Ping the database to verify the connection
    err = db.Ping()
    if (err != nil) {
        log.Fatal("Failed to ping the database:", err)
    }
    log.Println("Database connection established successfully")
}

// CreateUser inserts a new user into the database with first name, last name, email, hashed password, and phone
func createUser(firstName, lastName, email, hashedPassword, phone string) error {
    // Check if the email already exists
    var exists bool
    err := db.QueryRow("SELECT EXISTS(SELECT 1 FROM users WHERE email=$1)", email).Scan(&exists)
    if err != nil {
        log.Printf("Error checking if email exists: %v", err)
        return err
    }

    if exists {
        log.Printf("User with email %s already exists", email)
        return fmt.Errorf("user with email %s already exists", email)
    }

    // Insert the new user
    query := `INSERT INTO users (firstName, lastName, email, password, phone) VALUES ($1, $2, $3, $4, $5)`
    _, err = db.Exec(query, firstName, lastName, email, hashedPassword, phone)
    if err != nil {
        log.Printf("Error creating user: %v", err)
        return fmt.Errorf("error creating user: %v", err)
    }
    log.Printf("Successfully created user: %s %s", firstName, lastName)
    return nil
}

// GetUserByEmail retrieves a user by email
func getUserByEmail(email string) (*User, error) {
    var user User
    err := db.QueryRow("SELECT id, email, password FROM users WHERE email=$1", email).Scan(&user.ID, &user.Email, &user.Password)
    if err != nil {
        if err == sql.ErrNoRows {
            log.Printf("No user found with email: %s", email)
            return nil, nil
        }
        log.Printf("Error querying user by email: %v", err)
        return nil, err
    }
    return &user, nil
}

// UpdateUserPassword updates a user's password in the database
func updateUserPassword(email, hashedPassword string) error {
    query := `UPDATE users SET password=$1 WHERE email=$2`
    _, err := db.Exec(query, hashedPassword, email)
    if err != nil {
        log.Printf("Error updating password for user with email: %s", email)
        return err
    }
    log.Printf("Password updated for user with email: %s", email)
    return nil
}