// Switch to the database (adjust 'splitwise_db' to your actual DB name)
db = db.getSiblingDB('splitwise');

// Insert 2 users into the users collection
const result = db.users.insertMany([
  {
    username: 'john_doe',
    email: 'john@example.com',
    password: 'password123',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    username: 'jane_smith',
    email: 'jane@example.com',
    password: 'password456',
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);

print('✓ Successfully inserted 2 users');
print('Inserted IDs:', result.insertedIds);
