
package main

import (
    "encoding/json"
    "net/http"
)

// Struct for handling incoming form data from the React app
type ApplicantData struct {
    FirstName string `json:"firstName"`
    LastName  string `json:"lastName"`
    Email     string `json:"email"`
    Password  string `json:"password"`
    Phone     string `json:"phone"`
}

// HTTP handler for creating a user
func createUserHandler(w http.ResponseWriter, r *http.Request) {
    // Parse request data, assuming it's coming as JSON
    var reqData struct {
        FirstName string `json:"firstName"`
        LastName  string `json:"lastName"`
        Email     string `json:"email"`
        Password  string `json:"password"`
        Phone     string `json:"phone"`
    }

    err := json.NewDecoder(r.Body).Decode(&reqData)
    if err != nil {
        http.Error(w, "Invalid request payload", http.StatusBadRequest)
        return
    }

    // Create user and handle potential errors
    err = createUser(reqData.FirstName, reqData.LastName, reqData.Email, reqData.Password, reqData.Phone)
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
