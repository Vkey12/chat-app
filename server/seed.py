from flask_bcrypt import Bcrypt
# from flask_sqlalchemy import SQLAlchemy
# from sqlalchemy import MetaData
from faker import Faker
from models import app, db, User, Category, Transaction

fake = Faker()
bcrypt = Bcrypt(app) 

def seed_users(num_users=10):
    for _ in range(num_users):
        username = fake.user_name()
        email = fake.email()
        password = fake.password()
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
        user = User(username=username, email=email, password=hashed_password)
        db.session.add(user)
    db.session.commit()

def seed_categories():
    categories = ['Food', 'Entertainment', 'Transportation', 'Shopping', 'Health', 'Utilities']

    for category_name in categories:
        category = Category(name=category_name)
        db.session.add(category)
    db.session.commit()

def seed_transactions(num_transactions=100):
    users = User.query.all()
    categories = Category.query.all()

    for _ in range(num_transactions):
        user = fake.random_element(users)
        category = fake.random_element(categories)
        description = fake.sentence()
        amount = fake.random_number(digits=2)
        transaction = Transaction(description=description, amount=amount, user=user, category=category)
        db.session.add(transaction)
    db.session.commit()

if __name__ == '__main__':
    with app.app_context():
        # Create all tables
        db.create_all()

        # Seed data
        seed_users()
        seed_categories()
        seed_transactions()

        print("Database seeded successfully.")
