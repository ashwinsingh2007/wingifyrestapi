
# Installing

wingifyrestapi can be installed in nodejs environment. Config the app by following guidelines below : 

       1. Config the db.js file ,the credentials for your MySQL.
       2. Import the wingify.sql in your Mysql.
       3. Remember Database name should be "Wingify" and two tables name should be "StubUser" and "ITEMS" respectively.
       4. download all dependencies by "npm install" command.
       5. Start the server by running command "npm start".

# Quickstart
This app is already deployed on heroku , so you can quickly start here.
### 1.)Signup : 
        Have POST request on : https://wingifyrestapi.herokuapp.com/signup
        with Authentication(this will contain your username and password) inside the header.
        POSTMAN generates basic authentication for the provided username and password.
        
        *After signup ,remember your credential for using this API in future.
        
### 2.)INSERT Product :
##### JSON Format - {"Id":"[STRING]","Name":"[STRING]","Price":[NUMBER],"Description":"[STRING]","Quantity":[NUMBER]}
        Method : POST.
        POST URL : https://wingifyrestapi.herokuapp.com/online/products.
        Authentication : {username,passsord} (Try POSTMAN).
        Body : {"Id":"[STRING]","Name":"[STRING]","Price":[NUMBER],"Description":"[STRING]","Quantity":[NUMBER]} //(Data to be inserted.)
       
        *Note1 : The API may give you Invalid parameter or Wrong JSON Format in case of wrong url request or wrong json respectively.
        *Note2 : Only the authorized person with the username and password are able to create data.Also He can update/delete only the product data's created by him 
 
 ### 3.)UPDATE Product :
##### JSON Format - {"Id":"[STRING]","Name":"[STRING]","Price":[NUMBER],"Description":"[STRING]","Quantity":[NUMBER]}
        Method : PUT.
        PUT URL : https://wingifyrestapi.herokuapp.com/online/products
        Authentication : {username,passsord} (Try POSTMAN)
        Body : {"Id":"[STRING]","Name":"[STRING]","Price":[NUMBER],"Description":"[STRING]","Quantity":[NUMBER]} //(Data to be inserted.)
       
        *Note1 : The API may give you Invalid parameter or Wrong JSON Format in case of wrong url request or wrong json respectively.
        *Note2 : Incase if you the admin wants to update only on column, his body JSON must contain the updated value for the key and rest previous values for the key. 
        *Note3 : Items or Products can only be updated by there Id.   
        *Note4 : Only the user created/inserted the product data will be able to update it.
        *LIMITATION : Id of the Products cannot be updated.
 
 ### 4.)GET Product :
##### JSON Format - "No JSON Required"
        Method : GET.
        GET URL : https://wingifyrestapi.herokuapp.com/online/products?[options].
        options : 
            i)   "?limit=[NUMBER]" - Will get specified number of product data
            ii)  "?where=[STRING]/[NUMBER]" - Will get product data by filter criteria like "?where=Quantity>10" or "?where=Name='Rackets'" etc.
            iii) "?limit=[NUMBER]&where=[STRING]/[NUMBER]" - Will have functionality for both above two points.
            iv)  "?where='*'" - Will filter product data which are created or inserted by the current user.(Pass Authentication{username,password} for this).
            iv)  "?limit=[NUMBER]&where=*" - Will filter product data which are created or inserted by the current user also limits the amount of data to be rendered.(Pass Authentication{username,password} for this).
            
        
        Authentication : {username,passsord} (Try POSTMAN)(Required only when "https://wingifyrestapi.herokuapp.com/online/products?where=*" is requested)
        Body : Not required.
       
        *Note1 : The API may give you Invalid parameter.
        *Note2 : Any user can request and get the result.

 ### 3.)DELETE Product :
##### JSON Format - "No JSON Required"
        Method : DELETE.
        DELETE URL : https://wingifyrestapi.herokuapp.com/online/products/delete?Id=[STRING]
        Authentication : {username,passsord} (Try POSTMAN)
        Body :  Not required.
       
        *Note1 : Only the user created/inserted the product data will be able to delete it.  
 

# Getting help
If you need help installing or using the API, please contact legend.ashwini07@gmail.com
