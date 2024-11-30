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
    r.HandleFunc("/api/register", createUserHandler).Methods("POST")
    r.HandleFunc("/api/login", loginHandler).Methods("POST")
    r.HandleFunc("/api/reset-password", resetPasswordHandler).Methods("POST")
    r.HandleFunc("/api/user", getUserHandler).Methods("GET") // New route for getting user details

    //Property API's
    r.HandleFunc("/properties", createProperty).Methods("POST")
    r.HandleFunc("/properties", getProperties).Methods("GET")
    r.HandleFunc("/properties/{id}", deleteProperty).Methods("DELETE")
    r.HandleFunc("/properties/{id}", updateProperty).Methods("PATCH")
    r.HandleFunc("/properties/{id}", getPropertyByID).Methods("GET")
    
    //Tenants API's
	r.HandleFunc("/tenants", getAllTenants).Methods("GET")
	r.HandleFunc("/tenants/{id}", getTenantByID).Methods("GET")
	r.HandleFunc("/tenants", createTenant).Methods("POST")
	r.HandleFunc("/tenants/{id}", updateTenant).Methods("PATCH")
	r.HandleFunc("/tenants/{id}", deleteTenant).Methods("DELETE")

    //Rooms API's
	r.HandleFunc("/rooms", getAllRooms).Methods("GET")
	r.HandleFunc("/rooms/{id}", getRoomByID).Methods("GET")
	r.HandleFunc("/rooms", createRoom).Methods("POST")
	r.HandleFunc("/rooms/{id}", updateRoom).Methods("PATCH")
	r.HandleFunc("/rooms/{id}", deleteRoom).Methods("DELETE")
    
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
