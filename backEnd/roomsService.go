package main

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
	_ "github.com/lib/pq"
)

// Room struct represents the rooms table
type Room struct {
	ID        int     `json:"id"`
	PropertyID int    `json:"property_id"`
	TenantID   *int   `json:"tenant_id"`
	RoomNumber string `json:"room_number"`
	Rent       float64 `json:"rent"`
	DueDate    string `json:"due_date"`
	CreatedAt  string `json:"created_at"`
}

// Get all rooms
func getAllRooms(w http.ResponseWriter, r *http.Request) {
	rows, err := db.Query("SELECT id, property_id, tenant_id, room_number, rent, due_date, created_at FROM rooms")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var rooms []Room
	for rows.Next() {
		var room Room
		if err := rows.Scan(&room.ID, &room.PropertyID, &room.TenantID, &room.RoomNumber, &room.Rent, &room.DueDate, &room.CreatedAt); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		rooms = append(rooms, room)
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(rooms)
}

// Get room by ID
func getRoomByID(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	id, _ := strconv.Atoi(params["id"])

	var room Room
	err := db.QueryRow("SELECT id, property_id, tenant_id, room_number, rent, due_date, created_at FROM rooms WHERE id=$1", id).
		Scan(&room.ID, &room.PropertyID, &room.TenantID, &room.RoomNumber, &room.Rent, &room.DueDate, &room.CreatedAt)
	if err != nil {
		http.Error(w, "Room not found", http.StatusNotFound)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(room)
}

// Create a new room
func createRoom(w http.ResponseWriter, r *http.Request) {
	var room Room
	if err := json.NewDecoder(r.Body).Decode(&room); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	err := db.QueryRow(
		"INSERT INTO rooms (property_id, tenant_id, room_number, rent, due_date) VALUES ($1, $2, $3, $4, $5) RETURNING id",
		room.PropertyID, room.TenantID, room.RoomNumber, room.Rent, room.DueDate,
	).Scan(&room.ID)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(room)
}

// Update a room by ID
func updateRoom(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	id, _ := strconv.Atoi(params["id"])

	var room Room
	if err := json.NewDecoder(r.Body).Decode(&room); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	_, err := db.Exec(
		"UPDATE rooms SET property_id=$1, tenant_id=$2, room_number=$3, rent=$4, due_date=$5 WHERE id=$6",
		room.PropertyID, room.TenantID, room.RoomNumber, room.Rent, room.DueDate, id)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}

// Delete a room by ID
func deleteRoom(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	id, _ := strconv.Atoi(params["id"])

	_, err := db.Exec("DELETE FROM rooms WHERE id=$1", id)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}