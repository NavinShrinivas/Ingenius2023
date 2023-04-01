package database

import (
	"Ingenius23/communication"
	"net/http"
	"os"

	"github.com/golang-jwt/jwt"
	"github.com/joho/godotenv"
	log "github.com/urishabh12/colored_log"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var db *gorm.DB

func goDotEnvVariable(key string) string {

	// load .env file
	err := godotenv.Load(".env")

	if err != nil {
		log.Fatalf("Error loading .env file")
	}

	return os.Getenv(key)
}

func GetDatabaseConnection() (*gorm.DB, error) {
	dsn := goDotEnvVariable("DB_CONN")
	if db == nil { //If first time asking for database operations
		var err error
		db, err = gorm.Open(mysql.Open(dsn), &gorm.Config{})
		if err != nil {
			log.Panic("Error creating a connection to databse!", err)
			return nil, err
		}
		db.AutoMigrate(Team{})
		db.AutoMigrate(Meals{})
		db.AutoMigrate(User{})
      db.Set("gorm:auto_preload", true)
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


func GetFullUserRecord(req jwt.MapClaims) (string,int,bool,*User){
	db, err := GetDatabaseConnection()
	if err != nil {
		return "Internal Error",http.StatusInternalServerError,false,nil
	}
	query_user := User{
		SRN: req["SRN"].( string ),
	}
	var existing_user User
   db.First(&existing_user,&query_user)
   var eager_load User
   db.Debug().Preload("Team").Preload("Meals").First(&eager_load, &existing_user)
	if existing_user.SRN == req["SRN"] {
		//Need to do this check even though we have primary key as gorm add's it own primary key 'Id' making our entire primary key compostie and non uniuqe
		return "Found user records",http.StatusOK,true,&eager_load
	} else {
		return "Internal Error",http.StatusInternalServerError,false,nil
	}
}

func SetUserAttendance(req jwt.MapClaims)(string,int,bool){
	db, err := GetDatabaseConnection()
	if err != nil {
		return "Internal Error",http.StatusInternalServerError,false
	}
	update_user := User{
		SRN: req["SRN"].( string ),
      Present : true,
	}
   result:= db.Updates(&update_user)
   if result.RowsAffected == 0{
      return "Attendance already recorded.",http.StatusForbidden,false
      //We are sure users exists cus token wont be valid if not. Unless we mess up our databse 
	} else {
		return "Attendance recorded",http.StatusOK,true
	}
}

