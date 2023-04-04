# CMPUT404-Project

# Installation 
pip install virtualenv

virtualenv venv

venv\Scripts\activate

python -m pip install Django

# Run frontend
cd frontend

npm start

# Run backend (in new terminal)
cd backend

pip install -r requirements.txt

python manage.py runserver 

(might need to makemigrations and migrate first)
