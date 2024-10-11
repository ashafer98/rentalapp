
package main

import (
    "encoding/json"
    "net/http"
    "log"
)

// Struct for handling incoming form data from the React app
type ApplicantData struct {
    FirstName string `json:"firstName"`
    LastName  string `json:"lastName"`
    Email     string `json:"email"`
    Password  string `json:"password"`
    Phone     string `json:"phone"`
    IsAdmin   bool   `json:"isAdmin"`
}

// HTTP handler for creating a user
func createUserHandler(w http.ResponseWriter, r *http.Request) {
    // Parse request data, assuming it's coming as JSON
    var reqData ApplicantData

    // Log the incoming request body to check if isAdmin is received as expected
    err := json.NewDecoder(r.Body).Decode(&reqData)
    if err != nil {
        http.Error(w, "Invalid request payload", http.StatusBadRequest)
        return
    }

    // Log the request data to see what is being received
    log.Printf("Received request: %+v", reqData)

    // Create user and handle potential errors
    err = createUser(reqData.FirstName, reqData.LastName, reqData.Email, reqData.Password, reqData.Phone, reqData.IsAdmin)
    if err != nil {
        http.Error(w, err.Error(), http.StatusConflict) // Return the specific error message
        return
    }

    w.WriteHeader(http.StatusCreated)
    w.Write([]byte("User created successfully"))
}


// Login Handler
func loginHandler(w http.ResponseWriter, r *http.Request) {
    var reqData struct {
        Email    string `json:"email"`
        Password string `json:"password"`
    }
    json.NewDecoder(r.Body).Decode(&reqData)

    user, err := getUserByEmail(reqData.Email)
    if err != nil || !checkPasswordHash(reqData.Password, user.Password) {
        http.Error(w, "Invalid credentials", http.StatusUnauthorized)
        return
    }

    // Generate JWT
    token, err := generateJWT(user.Email)
    if err != nil {
        http.Error(w, "Error generating token", http.StatusInternalServerError)
        return
    }

    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(map[string]string{"token": token})
}

// Reset Password Handler
func resetPasswordHandler(w http.ResponseWriter, r *http.Request) {
    var reqData struct {
        Email string `json:"email"`
    }
    json.NewDecoder(r.Body).Decode(&reqData)

    user, err := getUserByEmail(reqData.Email)
    if err != nil {
        http.Error(w, "User not found", http.StatusNotFound)
        return
    }

    resetToken, err := generateJWT(user.Email)
    if err != nil {
        http.Error(w, "Error generating token", http.StatusInternalServerError)
        return
    }

    resetLink := "http://yourapp.com/reset-password?token=" + resetToken
    sendResetPasswordEmail(user.Email, resetLink)

    w.WriteHeader(http.StatusOK)
}


// GetUserHandler retrieves user details based on a valid JWT token
func getUserHandler(w http.ResponseWriter, r *http.Request) {
    // Extract token from Authorization header
    tokenHeader := r.Header.Get("Authorization")
    if tokenHeader == "" {
        http.Error(w, "Authorization token is required", http.StatusUnauthorized)
        return
    }

    // The token usually comes as "Bearer <token>", so we split it
    token := tokenHeader[len("Bearer "):]

    // Verify the token
    claims, err := verifyJWT(token)
    if err != nil {
        http.Error(w, "Invalid or expired token", http.StatusUnauthorized)
        return
    }

    // Fetch user by email from claims
    user, err := getUserByEmail(claims.Email)
    if err != nil || user == nil {
        http.Error(w, "User not found", http.StatusNotFound)
        return
    }

    // Return the user's details, excluding the password
    userResponse := struct {
        ID        int    `json:"id"`
        FirstName string `json:"firstName"`
        LastName  string `json:"lastName"`
        Email     string `json:"email"`
    }{
        ID:        user.ID,
        FirstName: user.FirstName,
        LastName:  user.LastName,
        Email:     user.Email,
    }

    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(userResponse)
}
