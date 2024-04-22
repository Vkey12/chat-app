from flask import Flask, request, jsonify, render_template, redirect, url_for, flash
from flask_migrate import Migrate
from models import db, User, Category, Transaction
from forms import RegistrationForm
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token
import os

secret_key = os.urandom(16)
print(secret_key.hex())

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATABASE = os.environ.get(
    "DB_URI", f"sqlite:///{os.path.join(BASE_DIR, 'app.db')}")

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False
app.config['SECRET_KEY'] = secret_key
app.config['JWT_SECRET_KEY'] = secret_key
CORS(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)


migrate = Migrate(app, db)

db.init_app(app)


@app.route('/login', methods=['POST'])
def login():
    
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()

    if user and user.check_password(password):
        access_token = create_access_token(identity=user.id)
        return jsonify(access_token=access_token), 200

    return jsonify({"msg": "Bad username or password"}), 401

@app.route('/signup', methods=['GET', 'POST'])
def signup():
    form = RegistrationForm()
    if form.validate_on_submit():
        username = form.username.data
        email = form.email.data
        password = form.password.data

        if User.query.filter_by(username=username).first():
            flash('Username already exists')
            return redirect(url_for('signup'))

        new_user = User(username=username, email=email)
        new_user.set_password(password)

        db.session.add(new_user)
        db.session.commit()
        
        flash('Thanks for registering!')
        return redirect(url_for('login'))
    return render_template('signup.html', form=form)


