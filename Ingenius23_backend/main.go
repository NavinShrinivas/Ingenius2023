package main

import (
	// "fmt"
	"Ingenius23/authentication"
	"Ingenius23/communication"
	"Ingenius23/database"
	"net/http"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	log "github.com/urishabh12/colored_log"
)

func main() {
	database.GetDatabaseConnection() //Migrations
	log.Println("Starting backend services...")
	database.TestDocs()
	r := gin.Default()
	r.Use(cors.Default())
	r.Use(cors.New(cors.Config{AllowOrigins: []string{"*"}}))
	r.GET("/status", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"status":  true,
			"message": "Services are live.",
		})
	})
	r.POST("/checkin", func(c *gin.Context) {
		var b communication.CheckInRequest
		err := c.BindJSON(&b)
		if err != nil {
			log.Println(err)
			c.JSON(http.StatusBadRequest, gin.H{
				"status":  false,
				"message": "invalid request",
			})
			return
		}
		status, fulluserrecord := database.CheckUserRecords(b)
		if status {
			qrbytes, message, httpstatus, status, err := authentication.GenerateQR(*fulluserrecord)
			if status == false {
				log.Println(err)
				c.JSON(httpstatus, gin.H{
					"status":  false,
					"message": message,
					"error":   err,
				})
			} else {
				if fulluserrecord.Checkin == true {
					//Business logic whether check in only once.
					c.JSON(http.StatusOK, gin.H{
						"status":  true,
						"message": "Already checked in!",
						"QR":      qrbytes,
					})
				} else {
					database.SetCheckedInUser(*fulluserrecord)
					c.JSON(http.StatusOK, gin.H{
						"status":  true,
						"message": "Checked in successfully!",
						"QR":      qrbytes,
					})
				}
			}
		} else {
			if fulluserrecord.SRN == b.SRN {
				_, message, httpstatus, status, err := authentication.GenerateQR(*fulluserrecord)
				if status == false {
					log.Println(err)
					c.JSON(httpstatus, gin.H{
						"status":  false,
						"message": message,
						"error":   err,
					})
				}
			}
			c.JSON(http.StatusForbidden, gin.H{
				"status":  false,
				"message": "Invalid User record!",
			})
		}
	})



	// this method is not secure. It offers a way to get the token from only the SRN without veryifying other details of the user
	// this is there as a backup if QR code reading fails
	// the frontend route /volunteer will hit this method if the qr code reading fails and they enter SRN manually
	// to make sure the participant is not cheating the system, the volunteer doing the checkins should verify the details of the participants and make sure they are who they say they are (check ID card or something)
	r.POST("/getTokenFromSRN", func(c *gin.Context) {
		var b communication.GetTokenFromSRNRequest
		err := c.BindJSON(&b)
		if err != nil {
			log.Println(err)
			c.JSON(http.StatusBadRequest, gin.H{
				"status":  false,
				"message": "invalid request",
			})
			return
		}
		status, fulluserrecord := database.CheckUserRecords_INSECURE(b)
		if status {
			message, httpstatus, status, token, _ := authentication.GenerateAuthToken(*fulluserrecord)
			if status == false {
				log.Println(err)
				c.JSON(httpstatus, gin.H{
					"status":  false,
					"message": message,
				})
			} else {
				if fulluserrecord.Checkin == true {
					//Business logic whether check in only once.
					c.JSON(http.StatusOK, gin.H{
						"status":  true,
						"message": "Already checked in!",
						"token":      token,
					})
				} else {
					database.SetCheckedInUser(*fulluserrecord)
					c.JSON(http.StatusOK, gin.H{
						"status":  true,
						"message": "Checked in successfully!",
						"token": token,
					})
				}
			}
		} else {
			c.JSON(http.StatusForbidden, gin.H{
				"status":  false,
				"message": "Invalid User record!",
			})
		}
	})

	r.POST("/createuser", func(c *gin.Context) {
		var b communication.UserInitRequest
		err := c.BindJSON(&b)
		if err != nil {
			log.Println(err)
			c.JSON(http.StatusBadRequest, gin.H{
				"status":  false,
				"message": "invalid request",
			})
			return
		}
		message, httpstatus, status := database.CreateUserRecord(b)
		if status {
			c.JSON(httpstatus, gin.H{
				"status":  status,
				"message": message,
			})
		} else {
			c.JSON(httpstatus, gin.H{
				"status":  status,
				"message": message,
			})
		}
	})

	r.POST("/info", func(c *gin.Context) {
		var b communication.StandardRequest
		err := c.BindJSON(&b)
		if err != nil {
			log.Println(err)
			c.JSON(http.StatusBadRequest, gin.H{
				"status":  false,
				"message": "invalid request",
			})
			return
		}
		claims := authentication.GetClaimsInfo(b.Token)
		if claims == nil {
			c.JSON(http.StatusNetworkAuthenticationRequired, gin.H{
				"status":  false,
				"message": "Invalid qr code!",
			})
			return
		}
		message, httpstatus, status, fulluserrecord := database.GetFullUserRecord(claims)
		if status {
			c.JSON(httpstatus, gin.H{
				"status":  status,
				"message": message,
				"user":    fulluserrecord,
			})
		} else {
			c.JSON(httpstatus, gin.H{
				"status":  status,
				"message": message,
			})
		}
	})

	r.POST("/attend", func(c *gin.Context) {
		var b communication.StandardRequest
		err := c.BindJSON(&b)
		if err != nil {
			log.Println(err)
			c.JSON(http.StatusBadRequest, gin.H{
				"status":  false,
				"message": "invalid request",
			})
			return
		}
		claims := authentication.GetClaimsInfo(b.Token)
		if claims == nil {
			c.JSON(http.StatusNetworkAuthenticationRequired, gin.H{
				"status":  false,
				"message": "Invalid qr code!",
			})
			return
		}
		message, httpstatus, status := database.SetUserAttendance(claims)
		if status {
			c.JSON(httpstatus, gin.H{
				"status":  status,
				"message": message,
			})
		} else {
			c.JSON(httpstatus, gin.H{
				"status":  status,
				"message": message,
			})
		}
	})

	r.POST("/checkout", func(c *gin.Context) {
		var b communication.StandardRequest
		err := c.BindJSON(&b)
		if err != nil {
			log.Println(err)
			c.JSON(http.StatusBadRequest, gin.H{
				"status":  false,
				"message": "invalid request",
			})
			return
		}
		claims := authentication.GetClaimsInfo(b.Token)
		if claims == nil {
			c.JSON(http.StatusNetworkAuthenticationRequired, gin.H{
				"status":  false,
				"message": "Invalid qr code!",
			})
			return
		}
		message, httpstatus, status := database.SetUserCheckout(claims)
		if status {
			c.JSON(httpstatus, gin.H{
				"status":  status,
				"message": message,
			})
		} else {
			c.JSON(httpstatus, gin.H{
				"status":  status,
				"message": message,
			})
		}
	})

	r.POST("/food", func(c *gin.Context) {
		var b communication.FoodPostRequest
		err := c.BindJSON(&b)
		if err != nil {
			log.Println(err)
			c.JSON(http.StatusBadRequest, gin.H{
				"status":  false,
				"message": "invalid request",
			})
			return
		}
		claims := authentication.GetClaimsInfo(b.Token)
		if claims == nil {
			c.JSON(http.StatusNetworkAuthenticationRequired, gin.H{
				"status":  false,
				"message": "Invalid qr code!",
			})
			return
		}
		message, httpstatus, status, _ := database.SetFoodStatus(claims, b.Meal)
		if status {
			c.JSON(httpstatus, gin.H{
				"status":  status,
				"message": message,
			})
		} else {
			c.JSON(httpstatus, gin.H{
				"status":  status,
				"message": message,
			})
		}
	})
	s := &http.Server{
		Addr:         ":5001",
		Handler:      r,
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 10 * time.Second,
		// MaxHeaderBytes: 1 << 20,
	}
	log.Println("Listening on port 5001.")
	s.ListenAndServe()
}
