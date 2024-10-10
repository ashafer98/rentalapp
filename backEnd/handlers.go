
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
}

// Registration handler to accept and process data from the frontend
func registerHandler(w http.ResponseWriter, r *http.Request) {
    var reqData ApplicantData

    // Decode the incoming JSON data
    err := json.NewDecoder(r.Body).Decode(&reqData)
    if err != nil {
        http.Error(w, "Invalid input", http.StatusBadRequest)
        return
    }

    // Hash the password before storing it
    hashedPassword, err := hashPassword(reqData.Password)
    if err != nil {
        http.Error(w, "Error hashing password", http.StatusInternalServerError)
        return
    }

    // Create the user in the database (this is the call to the createUser function from databases.go)
    err = createUser(reqData.FirstName, reqData.LastName, reqData.Email, hashedPassword, reqData.Phone)
    if err != nil {
        http.Error(w, "Error creating user", http.StatusInternalServerError)
        return
    }

    // Send success response
    w.WriteHeader(http.StatusCreated)
    log.Printf("New applicant registered: %s %s", reqData.FirstName, reqData.LastName)
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
