# Task Manager API

This is a simple task management API built with Node.js and Express. It allows you to create, read, update, and delete tasks.

## What it does

- Add new tasks
- View all tasks
- View a specific task by ID
- Update existing tasks
- Delete tasks
- Validates input data
- Handles errors properly

## Setup

Make sure you have Node.js installed (version 18 or higher).

1. Install the dependencies:
```
npm install
```

2. Start the server:
```
node app.js
```

The server will run on http://localhost:3000

## Testing

Run the tests with:
```
npm test
```

## API

The API has these endpoints:

- `GET /tasks` - Get all tasks
- `GET /tasks/:id` - Get a specific task
- `POST /tasks` - Create a new task
- `PUT /tasks/:id` - Update a task
- `DELETE /tasks/:id` - Delete a task

## Task format

Each task has this structure:
```json
{
  "id": 1,
  "title": "Task name",
  "description": "Task description",
  "completed": false
}
```

## Example

To create a new task:
```bash
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "My task", "description": "Do something", "completed": false}'
```

To get all tasks:
```bash
curl http://localhost:3000/tasks
```

## Technologies

- Node.js
- Express.js
- tap for testing
- supertest for API testing

Note: Tasks are stored in memory, so they'll be lost when you restart the server. 