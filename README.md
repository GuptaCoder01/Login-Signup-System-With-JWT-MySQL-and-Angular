# This project is a simple login and signup system built using Node.js, Express, JWT (JSON Web Tokens), MySQL, and Angular.

> [!IMPORTANT]
> ## The system includes the following features: 
>:shipit:
*  User Authentication: </ins> Users can sign up and log in using their email and password.

* JWT Authentication: JSON Web Tokens are used to secure the authentication process.

* Middleware for Route Protection: Middleware is implemented to check the validity of the token for protected routes.

* MySQL Database: MySQL is used as the database to store user information.

* Connection Pooling: MySQL connection pooling is used to manage database connections efficiently.

* Angular Front-End: The front-end is built using Angular, providing a responsive and dynamic user interface.

***

> [!TIP]
> Project Structure.


>  <ins> Backend:  </ins>

* Controllers: Contains the logic for handling user registration, login, and dashboard access.

* Middleware: Contains the authentication middleware to verify JWT tokens.

* Models: Contains the database  pool connection and query logic.

* Routes: Defines the API endpoints for user registration, login, and dashboard access.

* Winston: Winston libarary npm For ( logging various kinds of messages such as error logs, warnings, and info messages)


***
>  <ins> Frontend: </ins>

* Components: Angular components for login, signup, and dashboard.

* Services: Angular services for handling HTTP requests and authentication.

* Routing: Angular routing for navigating between different views.

* DomainNameError : While user start typing email, if email is missing it show domainname error.
