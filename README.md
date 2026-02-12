#  AgileFlow – Full-Stack Agile Project Management Platform

AgileFlow is a personal full-stack project built using **React.js** and **Django REST Framework**.  
It helps manage Projects, Sprints, and Tasks using a Kanban-style workflow and includes a CI/CD pipeline simulator for learning and demonstration purposes.

The goal of this project was to practice real-world full-stack development patterns such as authentication, REST APIs, frontend state management, and deployment-style workflows.

---

##  Features

###  Authentication
- JWT-based login and registration
- Protected frontend routes
- Owner-based API filtering (users only see their own data)

###  Project Management
- Create Projects
- Add Sprints to Projects
- Manage Tasks inside Sprints
- Task statuses: Todo, In Progress, Done
- Kanban-style workflow

###  CI/CD Pipeline Simulator
- Simulated pipeline runs
- Real-time progress updates
- Execution logs
- Cancel running pipelines
- Download logs

###  Demo Mode
- App can be explored without login
- Demo projects, sprints, and tasks
- Interactive Kanban and pipelines for guest users

---

##  Tech Stack

### Frontend
- React.js
- JavaScript / TypeScript
- Material UI
- Axios
- React Router

### Backend
- Python
- Django
- Django REST Framework
- JWT Authentication (SimpleJWT)

### Database
- SQLite (development)

---

##  Getting Started

Follow the steps below to run AgileFlow locally.

---

##  Backend Setup (Django)

```bash
cd backend

python -m venv venv

venv\Scripts\activate     # Windows
# source venv/bin/activate   # macOS / Linux

pip install -r requirements.txt

python manage.py migrate

python manage.py runserver

Backend will run at:

http://127.0.0.1:8000/
```

##  Frontend Setup (React)

```bash
cd frontend

npm install

npm start
```
