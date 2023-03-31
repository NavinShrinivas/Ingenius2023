package main

import (
	// "fmt"
	"Ingenius23/authentication"
	"Ingenius23/communication"
	"Ingenius23/database"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	log "github.com/urishabh12/colored_log"
)

func main() {
	log.Println("Starting backend services...")
	r := gin.Default()
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
			c.JSON(http.StatusForbidden, gin.H{
				"status":  false,
				"message": "Invalid User record!",
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
