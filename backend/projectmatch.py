# /// script
# requires-python = ">=3.15"
# dependencies = ["flask", "flask-cors"]
# ///

from app import app

if __name__ == "__main__":
    app.run(port=5001, debug=True)
