"""Compatibility launcher for the Flask API in ``backend/app``."""

import sys
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(PROJECT_ROOT))

from backend.app import app  # noqa: E402


if __name__ == "__main__":
    app.run(port=5001)
