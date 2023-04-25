import csv
import json
import requests

url = 'http://localhost:5001/createuser'

with open('selected.csv') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    line_count = 0
    for row in csv_reader:
        if line_count == 0:
            print(row)
            line_count += 1
        else:
            try :
                line_count += 1
                print(row[0],",",row[1],",",row[2],",",row[3],",",row[16],sep="")
                myobj = {'SRN': row[1],'name':row[0],'email':row[3],'phone' : row[2],'team_id':row[16]}
                x = requests.post(url, json = myobj)
                print(x.text)
                if row[4] != "":
                    print(row[4],",",row[5],",",row[6],",",row[7],",",row[16],sep="")
                    myobj = {'SRN': row[5],'name':row[4],'email':row[7],'phone' : row[6],'team_id':row[16]}
                    x = requests.post(url, json = myobj)
                    print(x.text)
                if row[8] != "":
                    print(row[8],",",row[9],",",row[10],",",row[11],",",row[16],sep="")
                    myobj = {'SRN': row[9],'name':row[8],'email':row[11],'phone' : row[10],'team_id':row[16]}
                    x = requests.post(url, json = myobj)
                    print(x.text)
                if row[12] != "":
                    print(row[12],",",row[13],",",row[14],",",row[15],",",row[16],sep="")
                    myobj = {'SRN': row[13],'name':row[12],'email':row[15],'phone' : row[14],'team_id':row[16]}
                    x = requests.post(url, json = myobj)
                    print(x.text)
            except: 
                continue
    # print(f'Processed {line_count} lines.')
