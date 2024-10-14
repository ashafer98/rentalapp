package main

import (
    "encoding/json"
    "github.com/gorilla/mux"
    "github.com/lib/pq"  // Import pq properly to use PostgreSQL driver features
    "io/ioutil"
    "net/http"
    "strconv"
)

// Property struct
type Property struct {
    ID          int      `json:"id"`
    Name        string   `json:"name"`
    Type        string   `json:"type"`
    Address     string   `json:"address"`
    City        string   `json:"city"`
    State       string   `json:"state"`
    Zip         string   `json:"zip"`
    Rent        float64  `json:"rent"`
    Deposit     float64  `json:"deposit"`
    Description string   `json:"description"`
    Images      [][]byte `json:"images"`  // Images as BLOBs
}



func createProperty(w http.ResponseWriter, r *http.Request) {
    var property Property
    r.ParseMultipartForm(10 << 20) // Max size 10 MB

    // Parse text fields
    property.Name = r.FormValue("name")
    property.Type = r.FormValue("type")
    property.Address = r.FormValue("address")
    property.City = r.FormValue("city")
    property.State = r.FormValue("state")
    property.Zip = r.FormValue("zip")
    property.Rent, _ = strconv.ParseFloat(r.FormValue("rent"), 64)
    property.Deposit, _ = strconv.ParseFloat(r.FormValue("deposit"), 64)
    property.Description = r.FormValue("description")

    // Parse uploaded images
    files := r.MultipartForm.File["images"]
    var images [][]byte

    for _, fileHeader := range files {
        file, err := fileHeader.Open()
        if err != nil {
            http.Error(w, err.Error(), http.StatusInternalServerError)
            return
        }
        defer file.Close()

        imageData, err := ioutil.ReadAll(file)
        if err != nil {
            http.Error(w, err.Error(), http.StatusInternalServerError)
            return
        }
        images = append(images, imageData)
    }
    property.Images = images

    // Insert into DB
    sqlStatement := `INSERT INTO properties (name, type, address, city, state, zip, rent, deposit, description, images)
                     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id`
    err := db.QueryRow(sqlStatement, property.Name, property.Type, property.Address, property.City,
        property.State, property.Zip, property.Rent, property.Deposit, property.Description, pq.Array(property.Images)).Scan(&property.ID)

    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }

    json.NewEncoder(w).Encode(property)
}

// Get All Properties Handler
func getProperties(w http.ResponseWriter, r *http.Request) {
    rows, err := db.Query(`SELECT id, name, type, address, city, state, zip, rent, deposit, description, images FROM properties`)
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }
    defer rows.Close()

    var properties []Property

    for rows.Next() {
        var property Property
        var images [][]byte

        err := rows.Scan(&property.ID, &property.Name, &property.Type, &property.Address, &property.City,
            &property.State, &property.Zip, &property.Rent, &property.Deposit, &property.Description, pq.Array(&images))
        if err != nil {
            http.Error(w, err.Error(), http.StatusInternalServerError)
            return
        }
        property.Images = images
        properties = append(properties, property)
    }

    json.NewEncoder(w).Encode(properties)
}

// Get Property by ID Handler
func getPropertyByID(w http.ResponseWriter, r *http.Request) {
    params := mux.Vars(r) // Extract the ID from the URL parameters
    id, err := strconv.Atoi(params["id"])
    if err != nil {
        http.Error(w, "Invalid property ID", http.StatusBadRequest)
        return
    }

    var property Property
    var images [][]byte

    sqlStatement := `SELECT id, name, type, address, city, state, zip, rent, deposit, description, images 
                     FROM properties WHERE id = $1`
    row := db.QueryRow(sqlStatement, id)

    err = row.Scan(&property.ID, &property.Name, &property.Type, &property.Address, &property.City,
        &property.State, &property.Zip, &property.Rent, &property.Deposit, &property.Description, pq.Array(&images))
    
	if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }

    property.Images = images
    json.NewEncoder(w).Encode(property)
}

// Delete Property Handler
func deleteProperty(w http.ResponseWriter, r *http.Request) {
    params := mux.Vars(r)
    id, _ := strconv.Atoi(params["id"])

    sqlStatement := `DELETE FROM properties WHERE id = $1`
    _, err := db.Exec(sqlStatement, id)
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }

    w.WriteHeader(http.StatusNoContent)
}

// Update Property Handler (PATCH)
func updateProperty(w http.ResponseWriter, r *http.Request) {
    params := mux.Vars(r)
    id, _ := strconv.Atoi(params["id"])

    var property Property
    json.NewDecoder(r.Body).Decode(&property)

    sqlStatement := `UPDATE properties SET name = $1, type = $2, address = $3, city = $4, state = $5, 
                     zip = $6, rent = $7, deposit = $8, description = $9 WHERE id = $10`
    _, err := db.Exec(sqlStatement, property.Name, property.Type, property.Address, property.City,
        property.State, property.Zip, property.Rent, property.Deposit, property.Description, id)

    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }

    json.NewEncoder(w).Encode(property)
}