package main

import (
	"database/sql"
	"encoding/json"
	"net/http"
	"strconv"
	"github.com/gorilla/mux"
	_ "github.com/lib/pq"
)

// Tenant struct represents the tenants table
type Tenant struct {
	ID                int    `json:"id"`
	Name              string `json:"name"`
	Email             string `json:"email"`
	Phone             string `json:"phone"`
	Address           string `json:"address"`
	BackgroundCheck   bool   `json:"background_check"`
	LeaseAgreementLink string `json:"lease_agreement_link,omitempty"`
	CreatedAt         string `json:"created_at"`
}

// Helper function to convert sql.NullString to string
func nullStringToString(ns sql.NullString) string {
	if ns.Valid {
		return ns.String
	}
	return ""
}

// Get all tenants
func getAllTenants(w http.ResponseWriter, r *http.Request) {
	rows, err := db.Query("SELECT id, name, email, phone, address, background_check, lease_agreement_link, created_at FROM tenants")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var tenants []Tenant
	for rows.Next() {
		var tenant Tenant
		var leaseLink sql.NullString // Handle NULL lease agreement link

		if err := rows.Scan(&tenant.ID, &tenant.Name, &tenant.Email, &tenant.Phone, &tenant.Address, &tenant.BackgroundCheck, &leaseLink, &tenant.CreatedAt); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		tenant.LeaseAgreementLink = nullStringToString(leaseLink)
		tenants = append(tenants, tenant)
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(tenants)
}

// Get tenant by ID
func getTenantByID(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	id, _ := strconv.Atoi(params["id"])

	var tenant Tenant
	var leaseLink sql.NullString // Handle NULL lease agreement link

	err := db.QueryRow("SELECT id, name, email, phone, address, background_check, lease_agreement_link, created_at FROM tenants WHERE id=$1", id).
		Scan(&tenant.ID, &tenant.Name, &tenant.Email, &tenant.Phone, &tenant.Address, &tenant.BackgroundCheck, &leaseLink, &tenant.CreatedAt)
	if err != nil {
		http.Error(w, "Tenant not found", http.StatusNotFound)
		return
	}

	tenant.LeaseAgreementLink = nullStringToString(leaseLink)

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(tenant)
}

// Create a new tenant
func createTenant(w http.ResponseWriter, r *http.Request) {
	var tenant Tenant
	if err := json.NewDecoder(r.Body).Decode(&tenant); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	err := db.QueryRow(
		"INSERT INTO tenants (name, email, phone, address, background_check, lease_agreement_link) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id",
		tenant.Name, tenant.Email, tenant.Phone, tenant.Address, tenant.BackgroundCheck, tenant.LeaseAgreementLink,
	).Scan(&tenant.ID)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(tenant)
}

// Update a tenant by ID
func updateTenant(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	id, _ := strconv.Atoi(params["id"])

	var tenant Tenant
	if err := json.NewDecoder(r.Body).Decode(&tenant); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	_, err := db.Exec(
		"UPDATE tenants SET name=$1, email=$2, phone=$3, address=$4, background_check=$5, lease_agreement_link=$6 WHERE id=$7",
		tenant.Name, tenant.Email, tenant.Phone, tenant.Address, tenant.BackgroundCheck, tenant.LeaseAgreementLink, id)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}

// Delete a tenant by ID
func deleteTenant(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	id, _ := strconv.Atoi(params["id"])

	_, err := db.Exec("DELETE FROM tenants WHERE id=$1", id)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}
