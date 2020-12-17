import requests

BASE="http://127.0.0.1:5000/"
data=[{"name":"Joe","views":20,"likes":10}
      ,{"name":"Yo","views":2021,"likes":1120}
      ,{"name":"So","views":2011,"likes":12220}
      ,{"name":"yello","views":2220,"likes":1022}]

for i in range(len(data)):
    response=requests.put(BASE + "video/" + str(i), data[i])
    print(response.json())
                         
# response=requests.put(BASE + "video/3",{"name":"yello","views":20,"likes":10}) #ie base is / and to /helloworld #it doesn't recognise if u put /tim/ instead of /tim
# print(response.json()) #run this as u run the api
#input()
response=requests.delete(BASE+"video/0")
print(response) 
                        
#input()
response=requests.get(BASE+"video/2")
print(response)                          
# response=requests.get(BASE + "video/6")
# print(response.json()) 
# input()

# response=requests.get(BASE + "video/2")
# print(response.json()) 
