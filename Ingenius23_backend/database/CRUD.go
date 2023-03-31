package database

import (
	"Ingenius23/communication"

	log "github.com/urishabh12/colored_log"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var db *gorm.DB

func GetDatabaseConnection() (*gorm.DB, error) {
	dsn := "ingeniususer:pass1234@tcp(127.0.0.1:3306)/ingenius23?charset=utf8mb4&parseTime=True&loc=Local"
	if db == nil { //If first time asking for database operations
		var err error
		db, err = gorm.Open(mysql.Open(dsn), &gorm.Config{})
		if err != nil {
			log.Panic("Error creating a connection to databse!", err)
			return nil, err
		}
		db.AutoMigrate(Team{})
		db.AutoMigrate(User{})
	}
	return db, nil
}

func CheckUserRecords(request communication.CheckInRequest) (bool, *User) {
	db, err := GetDatabaseConnection()
	if err != nil {
		return false, nil
	}
	query_user := User{
		SRN: request.SRN,
	}
	var existing_user User
	db.First(&existing_user, &query_user)
	log.Println(request, existing_user)
	if existing_user.SRN == request.SRN &&
		existing_user.Name == request.Name &&
		existing_user.Email == request.Email &&
		existing_user.Phone == request.Phone {
		//Need to do this check even though we have primary key as gorm add's it own primary key 'Id' making our entire primary key compostie and non uniuqe
		return true, &existing_user
	} else {
		return false, nil
	}
}

func SetCheckedInUser(user User) {
	db, err := GetDatabaseConnection()
	if err != nil {
		log.Panic("Something going wrong recording checkin attempt!")
		return
	}
	result := db.Model(&User{}).Where(&User{SRN: user.SRN}).Update("Checkin", true)
	if result.RowsAffected == 0 {
		log.Panic("Something going wrong recording checkin attempt!")
	}
}
