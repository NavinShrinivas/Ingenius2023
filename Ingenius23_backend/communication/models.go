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
