package main

import (
    "log"
    "net/http"
    "github.com/gorilla/mux"
    "github.com/rs/cors"
)

func main() {
    // Initialize the database connection
    initDB()

    // Initialize the router
    r := mux.NewRouter()

    // Define your routes
    r.HandleFunc("/api/register", registerHandler).Methods("POST")
    r.HandleFunc("/api/login", loginHandler).Methods("POST")
    r.HandleFunc("/api/reset-password", resetPasswordHandler).Methods("POST")

    // Set up CORS middleware
    c := cors.New(cors.Options{
        AllowedOrigins:   []string{"http://localhost:3000"}, // Allow your frontend URL
        AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
        AllowedHeaders:   []string{"Content-Type", "Authorization"},
        AllowCredentials: true,
    })

    // Wrap the router with the CORS middleware
    handler := c.Handler(r)

    // Start the server
    log.Println("Server running on http://localhost:8000")
    log.Fatal(http.ListenAndServe(":8000", handler))
}
