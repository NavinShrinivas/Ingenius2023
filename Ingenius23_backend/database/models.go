package database

// -----Databse Models-----
type Team struct {
	Team_id  string `gorm:"primaryKey" json:"team_id"`
	Table_no string `json:"table_no"`
}

type User struct {
	SRN        string `gorm:"primaryKey" json:"SRN"`
	Name       string `json:"name"`
	Email      string `json:"email"`
	Phone      string `json:"phone"`
	Team_id    string `json:"team_id"`
	Team       Team   `gorm:"foreignKey:Team_id"`
	Role       string `json:"usertype"`
	Present    bool   `json:"present"`
	Food_count int32  `json:"food_count"`
	Max_food   int32  `json:"max_food"`
	Checkin    bool   `json:"checkin"`
}
