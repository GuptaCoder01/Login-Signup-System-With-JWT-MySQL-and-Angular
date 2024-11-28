# This project is a simple login and signup system built using Node.js, Express, JWT (JSON Web Tokens), MySQL, and Angular.

> [!IMPORTANT]
> ## The system includes the following features: 
>:shipit:
* 
* **MySQL Database**: MySQL is used as the database to store user information.
* **JWT Authentication**: JSON Web Tokens are used to secure the authentication process.
* **User Authentication** : </ins> Users can sign up and log in using their email and password.
* **Connection Pooling**: MySQL connection pooling is used to manage database connections efficiently.
* **Angular Front-End**: The front-end is built using Angular, providing a responsive and dynamic user interface.
* **Middleware for Route Protection**: Middleware is implemented to check the validity of the token for protected routes.

***

> [!TIP]
> Project Structure.


>  <ins> Backend:  </ins>

* **Models**: Contains the database  pool connection and query logic.
* **Middleware**: Contains the authentication middleware to verify JWT tokens.
* **Routes**: Defines the API endpoints for user registration, login, and dashboard access.
* **Controllers**: Contains the logic for handling user registration, login, and dashboard access.
* **Winston**: Winston libarary npm For ( logging various kinds of messages such as error logs, warnings, and info messages)

***
>  <ins> Frontend: </ins>

* **Routing**: Angular routing for navigating between different views.
* **Components**: Angular components for login, signup, and dashboard.
* **Services**: Angular services for handling HTTP requests and authentication.
* **DomainNameError**: While user start typing email, if email is missing it show domainname error.
