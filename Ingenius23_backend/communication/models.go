package communication

import (
	"github.com/golang-jwt/jwt"
)

type CustomClaims struct {
	SRN     string `json:"SRN"`
	Name    string `json:"name"`
	Team_id string `json:"team_id"`
	Phone   string `json:"phone"`
	Email   string `json:"email"`
	jwt.StandardClaims
}

type CheckInRequest struct {
	SRN   string `json:"SRN"`
	Name  string `json:"name"`
	Phone string `json:"phone"`
	Email string `json:"email"`
}

type StandardRequest struct {
	Token string `json:"token"`
}

type FoodPostRequest struct {
	Token string `json:"token"`
	Meal  string `json:"meal"`
	//Dinner1|Midnight1|Coffee1|Coffee2|Coffee3|Breakfast1|Lunch1
}

type UserInitRequest struct {
	SRN     string `gorm:"primaryKey" json:"SRN"`
	Name    string `json:"name"`
	Email   string `json:"email"`
	Phone   string `json:"phone"`
	Team_id string `json:"team_id"`
}
