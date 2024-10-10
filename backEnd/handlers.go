
package main

import (
    "encoding/json"
    "net/http"
    "fmt"
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
    var user struct {
        FirstName      string `json:"firstName"`
        LastName       string `json:"lastName"`
        Email          string `json:"email"`
        HashedPassword string `json:"hashedPassword"`
        Phone          string `json:"phone"`
    }

    // Decode the request body into the user struct
    err := json.NewDecoder(r.Body).Decode(&user)
    if err != nil {
        http.Error(w, "Invalid request payload", http.StatusBadRequest)
        return
    }

    // Call createUser function
    err = createUser(user.FirstName, user.LastName, user.Email, user.HashedPassword, user.Phone)
    if err != nil {
        if err.Error() == fmt.Sprintf("user with email %s already exists", user.Email) {
            http.Error(w, err.Error(), http.StatusConflict)
        } else {
            http.Error(w, "Error creating user", http.StatusInternalServerError)
        }
        return
    }

    // Respond with success message
    w.WriteHeader(http.StatusCreated)
    json.NewEncoder(w).Encode(map[string]string{"message": "User created successfully"})
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
