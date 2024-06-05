import supertest from 'supertest'
import app from '../../src/application/app.js'
import UserUtils from './user-utils.js'

describe('POST /api/users/register [REGISTER]', () => {
  afterEach(async () => {
    await UserUtils.deleteAllTestUser(UserUtils.user_a.username)
  })

  it('should cannot register: no username', async () => {
    const response = await supertest(app).post('/api/users/register').send({ password: '12345', name: 'test' })
    expect(response.statusCode).toBe(400)
    expect(response.body.errors).toBeDefined()
  })
  it('should cannot register: no password', async () => {
    const response = await supertest(app).post('/api/users/register').send({ username: 'test', name: 'test' })
    expect(response.statusCode).toBe(400)
    expect(response.body.errors).toBeDefined()
  })
  it('should can register', async () => {
    const response = await supertest(app)
      .post('/api/users/register')
      .send(UserUtils.user_a)
    expect(response.statusCode).toBe(200)
    expect(response.body.data.username).toBe(UserUtils.user_a.username)
    expect(response.body.data.name).toBe(UserUtils.user_a.name)
  });
})
describe('POST /api/users/login [LOGIN]', () => {
  beforeEach(async () => {
    await UserUtils.createUser(UserUtils.user_a)
  })
  afterEach(async () => {
    await UserUtils.deleteAllTestUser(UserUtils.user_a.username)
  })
  it('should cannot login: no username', async () => {
    const response = await supertest(app).post('/api/users/login').send({ password: '12345' })
    expect(response.statusCode).toBe(400)
    expect(response.body.errors).toBeDefined()
  })
  it('should cannot login: no password', async () => {
    const response = await supertest(app).post('/api/users/login').send({ username: '12345' })
    expect(response.statusCode).toBe(400)
    expect(response.body.errors).toBeDefined()
  })
  it('should can login', async () => {
    const { username, password } = UserUtils.user_a
    const response = await supertest(app)
      .post('/api/users/login')
      .send({ username, password })
    expect(response.statusCode).toBe(200)
    expect(response.body.data.accessToken).toBeDefined()
  })
})
describe('GET /api/users/current [GET]', () => {
  beforeEach(async () => {
    await UserUtils.createUser(UserUtils.user_a)
  })
  afterEach(async () => {
    await UserUtils.deleteAllTestUser(UserUtils.user_a.username)
  })
  it('should cannot get: no token', async () => {
    const response = await supertest(app).get('/api/users/current')
    expect(response.statusCode).toBe(403)
  })
  it('should can get', async () => {
    const { username, password } = UserUtils.user_a
    const userLogin = await UserUtils.loginUser({username, password })
    const response = await supertest(app).get('/api/users/current').auth(userLogin.data.accessToken, { type: 'bearer'})
    expect(response.statusCode).toBe(200)
    expect(response.body.data).toBeDefined()
  });
})
describe('PATCH /api/users/current [UPDATE]', () => {
  beforeEach(async () => {
    await UserUtils.createUser(UserUtils.user_a)
  })
  afterEach(async () => {
    await UserUtils.deleteAllTestUser(UserUtils.user_a.username)
  })
  it('should cannot update: no token', async () => {
    const response = await supertest(app)
      .patch('/api/users/current')
      .send(UserUtils.user_a_update)
    expect(response.statusCode).toBe(403)
    expect(response.body.errors).toBeDefined()
  });
  it('should cannot update: invalid token', async () => {
    const response = await supertest(app)
      .patch('/api/users/current')
      .send(UserUtils.user_a_update)
      .auth('invalidToken', { type: 'bearer '})
    expect(response.statusCode).toBe(403)
    expect(response.body.errors).toBeDefined()
  });
  it('should can update: name only', async () => {
    const { username, password } = UserUtils.user_a
    const { name } = UserUtils.user_a_update
    const userLogin = await UserUtils.loginUser({ username, password })
    const response = await supertest(app).patch('/api/users/current').send({ name }).auth(userLogin.data.accessToken, { type: 'bearer'})
    expect(response.statusCode).toBe(200)
    expect(response.body.data.username).toBe(UserUtils.user_a.username)
  });
  it('should can update: address only', async () => {
    const { username, password } = UserUtils.user_a
    const { address } = UserUtils.user_a_update
    const userLogin = await UserUtils.loginUser({ username, password })
    const response = await supertest(app).patch('/api/users/current').send({ address }).auth(userLogin.data.accessToken, { type: 'bearer'})
    expect(response.statusCode).toBe(200)
    expect(response.body.data.username).toBe(UserUtils.user_a.username)
  });
  it('should can update: profile picture only', async () => {
    const { username, password } = UserUtils.user_a
    const { profilePicture } = UserUtils.user_a_update
    const userLogin = await UserUtils.loginUser({ username, password })
    const response = await supertest(app).patch('/api/users/current').send({ profilePicture }).auth(userLogin.data.accessToken, { type: 'bearer'})
    expect(response.statusCode).toBe(200)
    expect(response.body.data.username).toBe(UserUtils.user_a.username)
  });
  it('should can update: all', async () => {
    const { username, password } = UserUtils.user_a
    const userLogin = await UserUtils.loginUser({ username, password })
    const response = await supertest(app).patch('/api/users/current').send(UserUtils.user_a_update).auth(userLogin.data.accessToken, { type: 'bearer'})
    expect(response.statusCode).toBe(200)
    expect(response.body.data.username).toBe(UserUtils.user_a.username)
  });
})
describe('DELETE /api/users/current [LOGOUT]', () => {
  beforeEach(async () => {
    await UserUtils.createUser(UserUtils.user_a)
  })
  afterEach(async () => {
    await UserUtils.deleteAllTestUser(UserUtils.user_a.username)
  })

  it('should cannot logout: no token', async () => {
    const response = await supertest(app).delete('/api/users/current')
    expect(response.statusCode).toBe(403)
    expect(response.body.errors).toBeDefined()
  })

  it('should cannot logout: invalid token', async () => {
    const response = await supertest(app).delete('/api/users/current').auth('invalidToken', { type: 'bearer'})
    expect(response.statusCode).toBe(403)
    expect(response.body.errors).toBeDefined()
  })

  it('should can logout', async () => {
    const { username, password } = UserUtils.user_a
    const userLogin = await UserUtils.loginUser({ username, password })
    const response = await supertest(app).delete('/api/users/current').auth(userLogin.data.accessToken, { type: 'bearer' })
    expect(response.statusCode).toBe(200)
    expect(response.body.data.username).toBe(UserUtils.user_a.username)
  })
})
