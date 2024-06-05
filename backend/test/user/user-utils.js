import database from '../../src/application/database.js';
import bcrypt from 'bcrypt';
import app from '../../src/application/app.js';
import supertest from 'supertest';

class UserUtils {
  static user_a = {
    username: 'test a',
    name: 'test a',
    password: '12345'
  }
  static user_b = {
    username: 'test b',
    name: 'test b',
    password: '12345'
  }
  static user_a_update = {
    name: 'test a name update',
    profilePicture: 'http://google.com',
    address: 'test a address update'
  }
  static async createUser(data) {
    await database.user.create({ data: { username: data.username, name: data.name, password: await bcrypt.hash(data.password, 10) }})
  }
  static async deleteAllTestUser(contain) {
    await database.user.deleteMany({ where: {username: contain }})
  }
  static async loginUser(data) {
    const response = await supertest(app)
      .post('/api/users/login')
      .send(data)
    return response.body
  }
}

export default UserUtils;
