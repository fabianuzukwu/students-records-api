# Student Records API

A REST API for managing student records, with full create, read, update and delete (CRUD) operations. Built with Node.js, Express, Sequelize and MySQL.

## Getting Started

### Prerequisites
- Node.js and npm
- A running MySQL server

### Installation
1. Clone the repository and open the project folder.
2. Install the dependencies:

```
npm install
```

3. Create your environment file by copying `.env.example` to a new file named `.env`, then fill in your own values. The `.env` file holds secrets, so it is never committed to Git.

### Environment Variables
| Key | Description |
| --- | --- |
| [DB_NAME] | Name of your MySQL database |
| [DB_USER] | Your MySQL username |
| [DB_PASSWORD] | Your MySQL password |
| [DB_HOST] | Database host, for example localhost |
| PORT | Port the server listens on |

[Replace the keys above with the exact names in your .env.example]

### Database Setup
1. Create an empty MySQL database with the same name you put in `.env`.
2. Run the migrations to create the tables:

```
npx sequelize-cli db:migrate
```

### Running the Server
```
npm run dev
```
The server runs on the port set in `.env`.

## API Endpoints
| Method | Path | Description |
| --- | --- | --- |
| GET | /students | Get all students 
| GET | /students/:id | Get one student  |
| POST | /students | Create a student  |
| PUT | /students/:id | Update a student  |
| DELETE | /students/:id | Delete a student  |

## Tech Stack
- Node.js
- Express
- Sequelize
- MySQL