# Vault
a website management web app based on pern stack
documentation :
this project is used to get the websites links of a company from one place
routes : 
'/pass' ; is the route used to generate a bcrypt hashed password 
'/' : is the home page route that provides the landing page to the visitors and all the links to the different sites
'/admin' : is the admin panel route and it is protected with an authentication process 
note: due to the lack of time i wasn't able to implement a proper solution for the creation of new admins or changing the password if it is forgotten
so i have made the '/pass' route to generate a hashed password for the admin and then he can directly create a user in the users table inside the postgres 
database and put that password with a user name of his choice and use the plain text password to login (all the comparing of hashed and plain text password
is done in the server)
rules:
a link must be between 10 and 500 characters long with or without 'http://','https://' (added automatically if not included).
a title must be between 5 and 15 characters long
a description must be between 10 and 25 characters long 
an image must be included and have one of these extensions ('png','gif','jpg')
thank you for using my app.
