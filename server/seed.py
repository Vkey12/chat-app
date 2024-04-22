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

# def seed_categories():
#     categories = ['Food', 'Entertainment', 'Transportation', 'Shopping', 'Health', 'Utilities']

#     for category_name in categories:
#         category = Category(name=category_name)
#         db.session.add(category)
#     db.session.commit()

def seed_categories():
    categories = ['Food', 'Entertainment', 'Transportation', 'Shopping', 'Health', 'Utilities']

    for category_name in categories:
        # Check if the category already exists in the database
        existing_category = Category.query.filter_by(name=category_name).first()
        if not existing_category:
            # If the category doesn't exist, add it to the database
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

# from random import choice as rc
# from app import app
# from models import db, Category, User, Transaction
# from datetime import datetime

# def seed_data():
#     # Delete existing data
#     print("Clearing old data...")
#     db.drop_all()
#     db.create_all()

#     # Add new data
#     print("Adding users...")
#     user1 = User(username='john_doe', email='john@example.com')
#     user1.set_password('john1234')

#     user2 = User(username='jane_doe', email='jane@example.com')
#     user2.set_password('jane1234')

#     db.session.add(user1)
#     db.session.add(user2)

#     print("Adding categories...")
#     category1 = Category(name='Leisure')
#     category2 = Category(name='Groceries')
#     category3 = Category(name='Utilities')

#     db.session.add(category1)
#     db.session.add(category2)
#     db.session.add(category3)

#     print("Adding transactions...")
#     transaction1 = Transaction(description='Cinema Tickets', amount=45.0, date=datetime.strptime('2023-04-05', '%Y-%m-%d'), category=category1, user=user1)
#     transaction2 = Transaction(description='Electricity Bill', amount=90.0, date=datetime.strptime('2023-04-10', '%Y-%m-%d'), category=category3, user=user2)
#     transaction3 = Transaction(description='Supermarket', amount=60.0, date=datetime.strptime('2023-04-03', '%Y-%m-%d'), category=category2, user=user1)

#     db.session.add(transaction1)
#     db.session.add(transaction2)
#     db.session.add(transaction3)

#     db.session.commit()
#     print("Data seeded successfully!")

# if __name__ == '__main__':
#     with app.app_context():
#         seed_data()