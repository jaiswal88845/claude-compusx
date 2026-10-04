// Switch to the database (adjust 'splitwise_db' to your actual DB name)
db = db.getSiblingDB('splitwise');

// Insert the new user into the users collection
const result = db.users.insertMany([
  {
    uid: 1,
    username: 'jlj',
    email: 'jlj@example.com',
    password: 'jljpassword',
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);

print('✓ Successfully inserted 1 user');
print('Inserted IDs:', result.insertedIds);
