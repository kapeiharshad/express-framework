const UserService = require('../services/users.service');
const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');
require('dotenv').config();
let connection;
let db;

beforeAll(async () => {
  connection = await MongoClient.connect(
    'mongodb://localhost:27017/test_trade_managements',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  );
  db = await connection.db('test_trade_managements');
});
afterAll(async () => {
  await db.dropDatabase();
  await connection.close();
});

it('should insert a doc into collection', async () => {
  const users = db.collection('users');

  const mockUser = { _id: 'some-user-id', name: 'John' };
  await users.insertOne(mockUser);

  const insertedUser = await users.findOne({ _id: 'some-user-id' });
  expect(insertedUser).toEqual(mockUser);
});
