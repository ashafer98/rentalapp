package main

import (
    "database/sql"
    _ "github.com/lib/pq"
    "log"
    "fmt"
)

var db *sql.DB

// Initialize the database connection
func initDB() {
    var err error
    db, err = sql.Open("postgres", "user=postgres dbname=rentalApp sslmode=disable password=root")
    if err != nil {
        log.Fatal("Failed to connect to the database:", err)
    }

    // Ping the database to verify the connection
    err = db.Ping()
    if err != nil {
        log.Fatal("Failed to ping the database:", err)
    }
    log.Println("Database connection established successfully")
}

// CreateUser inserts a new user into the database
func createUser(firstName, lastName, email, password, phone string, isAdmin bool) error {
    // Check if the email already exists
    existingUser, err := getUserByEmail(email)
    if err != nil {
        return err
    }
    if existingUser != nil {
        // Return a specific error message when a duplicate email is found
        return fmt.Errorf("User with email %s already exists", email)    }

    // Hash the password before saving to the database
    hashedPassword, err := hashPassword(password)
    if err != nil {
        return err
    }

    // Insert the new user with the hashed password
    query := `INSERT INTO users (firstName, lastName, email, password, phone, isAdmin ) VALUES ($1, $2, $3, $4, $5, $6)`
    _, err = db.Exec(query, firstName, lastName, email, hashedPassword, phone, isAdmin)
    if err != nil {
        log.Printf("Error inserting user into database: %v", err)
        return err
    }

    log.Printf("Successfully created user: %s %s", firstName, lastName)
    return nil
}

// GetUserByEmail retrieves a user by email
func getUserByEmail(email string) (*User, error) {
    var user User
    // Update the query to select firstName, lastName, email, password, and isAdmin
    err := db.QueryRow("SELECT id, firstName, lastName, email, password, isAdmin FROM users WHERE email=$1", email).
        Scan(&user.ID, &user.FirstName, &user.LastName, &user.Email, &user.Password, &user.IsAdmin)
    
    if err != nil {
        if err == sql.ErrNoRows {
            return nil, nil // No user found, return nil
        }
        return nil, err // Some other error occurred, return the error
    }
    return &user, nil
}

