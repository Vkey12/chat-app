from random import choice as rc
from app import app
from models import db, Category, User, Transaction
from datetime import datetime

def seed_data():
    # Delete existing data
    print("Clearing old data...")
    db.drop_all()
    db.create_all()

    # Add new data
    print("Adding users...")
    user1 = User(username='john_doe', email='john@example.com')
    user1.set_password('john1234')

    user2 = User(username='jane_doe', email='jane@example.com')
    user2.set_password('jane1234')

    db.session.add(user1)
    db.session.add(user2)

    print("Adding categories...")
    category1 = Category(name='Leisure')
    category2 = Category(name='Groceries')
    category3 = Category(name='Utilities')

    db.session.add(category1)
    db.session.add(category2)
    db.session.add(category3)

    print("Adding transactions...")
    transaction1 = Transaction(description='Cinema Tickets', amount=45.0, date=datetime.strptime('2023-04-05', '%Y-%m-%d'), category=category1, user=user1)
    transaction2 = Transaction(description='Electricity Bill', amount=90.0, date=datetime.strptime('2023-04-10', '%Y-%m-%d'), category=category3, user=user2)
    transaction3 = Transaction(description='Supermarket', amount=60.0, date=datetime.strptime('2023-04-03', '%Y-%m-%d'), category=category2, user=user1)

    db.session.add(transaction1)
    db.session.add(transaction2)
    db.session.add(transaction3)

    db.session.commit()
    print("Data seeded successfully!")

if __name__ == '__main__':
    with app.app_context():
        seed_data()

        