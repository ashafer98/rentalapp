package main

import (
    "github.com/sendgrid/sendgrid-go"
    "github.com/sendgrid/sendgrid-go/helpers/mail"
    "log"
)

func sendWelcomeEmail(userEmail string) error {
    from := mail.NewEmail("Your App", "noreply@yourapp.com")
    subject := "Welcome to Our App!"
    to := mail.NewEmail("New User", userEmail)
    plainTextContent := "Thank you for signing up!"
    htmlContent := "<strong>Thank you for signing up!</strong>"
    message := mail.NewSingleEmail(from, subject, to, plainTextContent, htmlContent)

    client := sendgrid.NewSendClient("SENDGRID_API_KEY")
    response, err := client.Send(message)
    if err != nil {
        return err
    }

    log.Printf("Email sent with status code: %d\n", response.StatusCode)
    return nil
}

func sendResetPasswordEmail(userEmail, resetLink string) error {
    from := mail.NewEmail("Your App", "noreply@yourapp.com")
    subject := "Password Reset Request"
    to := mail.NewEmail("User", userEmail)
    plainTextContent := "Click the link to reset your password: " + resetLink
    htmlContent := "<strong>Click the link to reset your password:</strong> " + resetLink
    message := mail.NewSingleEmail(from, subject, to, plainTextContent, htmlContent)

    client := sendgrid.NewSendClient("SENDGRID_API_KEY")
    response, err := client.Send(message)
    if err != nil {
        return err
    }

    log.Printf("Password reset email sent with status code: %d\n", response.StatusCode)
    return nil
}
