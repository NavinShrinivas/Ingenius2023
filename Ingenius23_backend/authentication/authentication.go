package authentication

import (
	// "fmt"
	"Ingenius23/communication"
	"Ingenius23/database"
	"net/http"
	"os"

	"github.com/golang-jwt/jwt"
	"github.com/joho/godotenv"
	"github.com/skip2/go-qrcode"
	log "github.com/urishabh12/colored_log"
)

func goDotEnvVariable(key string) string {

	// load .env file
	err := godotenv.Load(".env")

	if err != nil {
		log.Fatalf("Error loading .env file")
	}

	return os.Getenv(key)
}

func JWTAuthCheck(rawtoken string) (bool, *jwt.MapClaims) {
	//[TODO] We can improve security by doing a database check after getting the claims
	parser_struct := jwt.Parser{
		UseJSONNumber:        true,  //Force number to be raw numbers and not strings
		SkipClaimsValidation: false, //Forces password validation
	}

	//The third parameter is a callback function that Parse function executes
	claims := jwt.MapClaims{}
	dotenv := goDotEnvVariable("SECRET_KEY")
	token, err := parser_struct.ParseWithClaims(string(rawtoken), claims, func(token *jwt.Token) (interface{}, error) {
		return []byte(dotenv), nil
		//[TODO]Should move the password to a global hidden config file
	})
	if err != nil {
		return false, nil
	}
	if token.Valid {
		//Auth is succesfull
		//[TODO] quick DB lookup to actually see users existence
		return true, &claims
	} else {
		return false, nil
	}
}

func GenerateAuthToken(user_record database.User) (string, int, bool, string, *communication.CustomClaims) {
	mySigningKey := []byte("shoouldbekeptsecret")
	// Create the Claims
	claims := communication.CustomClaims{
		user_record.SRN,
		user_record.Name,
		user_record.Team.Team_id,
		user_record.Email,
		user_record.Phone,
		jwt.StandardClaims{
			Issuer: "userservice",
		},
		//[TODO] No expiry time, should implement it.
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	ss, err := token.SignedString(mySigningKey)
	if err != nil {
		return "something went wrong on our side, please try again later.", http.StatusInternalServerError, false, "", nil
	}
	return "Logged in succesfully!", http.StatusOK, true, ss, &claims
}

func GetClaimsInfo(rawtoken string) map[string]interface{} {
	parser_struct := jwt.Parser{
		UseJSONNumber:        true,  //Force number to be raw numbers and not strings
		SkipClaimsValidation: false, //Forces password validation
	}
	claims := jwt.MapClaims{}
	token, _ := parser_struct.ParseWithClaims(rawtoken, claims, func(token *jwt.Token) (interface{}, error) {
		return []byte("shoouldbekeptsecret"), nil
		//[TODO]Should move the password to a global hidden config file
	})
	if token.Valid {
		//Above if condition is redundant
		return claims //Is a hashmap k-v pair
	}else{
      log.Println("Catch that fellow, trying to cheat the system it seems.")
      return nil
   }
	log.Panic("Someeone is messing with memory stuff!!")
	return nil
}

func GenerateQR(fulluserrecord database.User) ([]byte, string, int, bool, error) {
	message, httpstatus, status, token, _ := GenerateAuthToken(fulluserrecord)
	if status == true {
		var png []byte
		png, err := qrcode.Encode(token, qrcode.Medium, 256)
		if err != nil {
			return nil, "Error generating QRm try again later.", http.StatusInternalServerError, false, err
		} else {
			return png, "Generate QR!", http.StatusOK, true, nil
		}
	} else {
		return nil, message, httpstatus, status, nil
	}
	return nil, "Internal Error.", http.StatusInternalServerError, false, nil
}
