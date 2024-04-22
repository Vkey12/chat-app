from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates, relationship
from sqlalchemy_serializer import SerializerMixin
from datetime import datetime
from flask_bcrypt import bcrypt

metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

db = SQLAlchemy(metadata=metadata)

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(128), nullable=False)  # Store the hashed password
    transactions = db.relationship('Transaction', backref='user', lazy='dynamic')

    @validates('username')
    def validate_username(self, key, username):
        if not username:
            raise ValueError('Username is required.')
        if len(username) < 3:
            raise ValueError('Username must be at least 3 characters long.')
        return username
    
    serialize_rules = ('-password',)

    def set_password(self, password):
        self.password = bcrypt.generate_password_hash(password).decode('utf-8')

    def check_password(self, password):
        return bcrypt.check_password_hash(self.password, password)

    def __repr__(self):
        return f'<User {self.username}>'


class Category(db.Model):
    __tablename__ = 'categories'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=True, nullable=False)
    transactions = db.relationship('Transaction', backref='category', lazy='dynamic')

    @validates('name')
    def validate_name(self, key, name):
        if not name:
            raise ValueError('Category name is required.')
        return name
    
    serialize_rules = () 

    def __repr__(self):
        return f'<Category {self.name}>'

class Transaction(db.Model):
    __tablename__ = 'transactions'

    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(100), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    date = db.Column(db.DateTime, server_default=db.func.now())
    category_id = db.Column(db.Integer, db.ForeignKey('categories.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    
    def to_dict(self):
        return {
            'id': self.id,
            'description': self.description,
            'amount': self.amount,
            'date': self.date.strftime('%Y-%m-%d %H:%M:%S'),  # Convert datetime to string
            'category_id': self.category_id,
            'user_id': self.user_id
        }
    
    @validates('description')
    def validate_description(self, key, description):
        if not description:
            raise ValueError('Description is required.')
        return description

    @validates('amount')
    def validate_amount(self, key, amount):
        if not amount:
            raise ValueError('Amount is required.')
        try:
            amount = float(amount)  # Convert amount to float
            if amount <= 0:
                raise ValueError('Amount must be greater than 0.')
        except ValueError:
            raise ValueError('Invalid amount format.')
        return amount
    
    serialize_rules = ('-user', '-category')

    def __repr__(self):
        return f'<Transaction {self.id}>'
    


