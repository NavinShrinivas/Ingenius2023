package database

import (
	"time"
)

// -----Databse Models-----
type Team struct {
	Team_id  string `json:"team_id"`
   Table_no int    `gorm:"primaryKey;autoIncrement:true" json:"table_no"`
}

type Meals struct {
	Meal_id    int  `gorm:"primaryKey;autoIncrement:true" json:"meal_id" `
	Dinner1    bool `json:"dinner1"`
	Midnight1  bool `json:"midnight1"`
	Coffee1    bool `json:"coffee1"`
	Coffee2    bool `json:"coffee2"`
	Coffee3    bool `json:"coffee3"`
	Breakfast1 bool `json:"breakfast1"`
	Lunch1     bool `json:"lunch1"`
}

type User struct {
	SRN        string    `gorm:"primaryKey" json:"SRN"`
	Name       string    `json:"name"`
	Email      string    `json:"email"`
	Phone      string    `json:"phone"`
	Team_id    string    `json:"team_id"`
	Team       Team      `gorm:"foreignKey:Team_id;references:Team_id" json:"team"`
	Role       string    `json:"usertype"`
	Present    bool      `json:"present"`
	Entry_time time.Time `json:"entry_time"`
	Checkin    bool      `json:"checkin"`
	Checkout   bool      `json:"checkout"`
	Meal_id    int       `json:"meal_id"`
	Meals      Meals     `gorm:"foreignKey:Meal_id;references:Meal_id" json:"meals"`
	Exit_time  time.Time `json:"exit_time"`
}
