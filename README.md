# ProjectMatch

ProjectMatch helps students find projects and teammates. Users can create a profile, browse projects, find students with complementary skills, post projects, and see project matches.

## Features

- Student accounts and profiles
- Project browsing and details
- Project posting
- Teammate discovery
- Project recommendations based on skills, interests, and availability

## Tech Stack

- **Frontend:** Vite and JavaScript
- **Backend:** Python, Flask, and Flask-CORS
- **Database:** SQLite

## Project Structure

```text
projectmatch/
├── backend/
│   ├── app/
│   │   ├── routes/
│   │   │   ├── auth.py
│   │   │   ├── projects.py
│   │   │   └── users.py
│   │   ├── __init__.py
│   │   ├── database.py
│   │   └── matching.py
│   ├── data/                 # Local SQLite databases
│   ├── scripts/
│   │   ├── reset_password.py
│   │   └── seed.py
│   ├── requirements.txt
│   └── run.py
└── frontend/
    ├── src/
    │   ├── pages/            # Page-specific JavaScript
│   │   ├── shared/           # Shared frontend modules
│   │   ├── assets/
│   │   ├── data/
│   │   ├── main.js
│   │   └── style.css
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
```

## Prerequisites

- Python 3.15
- [uv](https://docs.astral.sh/uv/)
- Node.js and npm

## Run Locally

Start the backend and frontend in separate terminals.

### Backend

From the project root:

```sh
cd backend
uv run --isolated --python 3.15 --with-requirements requirements.txt python run.py
```

The backend runs at <http://127.0.0.1:5001>. Keep this terminal open.

### Frontend

In a second terminal, from the project root:

```sh
cd frontend
npm install
npm run dev
```

Open the local URL Vite prints, usually <http://localhost:5173>.

## Database

The backend creates its SQLite databases in `backend/data/`:

- `projects.db`
- `users.db`

These files contain local development data. Back them up if you need to preserve their contents.

The demo seed script **deletes and recreates both databases** before adding demo data. Only run it if you are okay replacing the current local data. From the `backend/` directory, run:

```sh
PYTHONPATH=app uv run --isolated --python 3.15 \
  --with-requirements requirements.txt python scripts/seed.py
```

## Troubleshooting

- **`vite: command not found`:** Run `npm install` from the `frontend/` directory.
- **Frontend API requests fail:** Make sure the backend is running on port `5001`.
- **Python import errors:** Run the backend command from the `backend/` directory as shown above.
- **Port already in use:** Stop the other process using the port, then restart the app.
