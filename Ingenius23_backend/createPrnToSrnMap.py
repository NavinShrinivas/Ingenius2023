import csv
import mysql.connector  # Use mysql.connector for MariaDB
import json

# Database connection details (replace with your actual credentials)
db_config = {
    'host': 'localhost',
    'user': 'pes_people_bot',
    'password': 'supersecurepassword',
    'database': 'prn_to_srn'
}

conn = mysql.connector.connect(**db_config)
cursor = conn.cursor()

def get_prn_from_srn(srn):
    cursor.execute("SELECT PRN FROM THETABLE WHERE SRN = %s", (srn,))
    result = cursor.fetchone()
    return result[0] if result else None


# Read SRNs from the CSV file
srns = []
with open('srnInput.csv', 'r') as file:
    reader = csv.reader(file)
    for row in reader:
        srns.append(row[0])

# Create a dictionary to store the mappings (PRN as key, SRN as value)
prn_to_srn_map = {}

# Map SRNs to PRNs using the database
for srn in srns:
    prn = get_prn_from_srn(srn)
    if prn:
        prn_to_srn_map[prn] = srn

# Convert the dictionary to a JSON object
json_data = json.dumps(prn_to_srn_map)

print(json_data)

conn.close()
