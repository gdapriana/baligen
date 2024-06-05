import supertest from 'supertest';
import app from '../../src/application/app.js';
import CultureUtils from './culture-utils.js';
import UserUtils from '../user/user-utils.js';
import cultureUtils from './culture-utils.js';

describe('GET  /cultures/:slug [GET CULTURE]', () => {
  beforeEach(async () => {
    await CultureUtils.createCulture(CultureUtils.culture)
  })
  afterEach(async () => {
    await CultureUtils.deleteCulture(CultureUtils.culture.slug)
  })
  it('should cannot get: no culture found', async () => {
    const response = await supertest(app)
      .get('/cultures/invalidSlug')
    expect(response.statusCode).toBe(404)
    expect(response.body.errors).toBeDefined()
  })
  it('should can get', async () => {
    const response = await supertest(app)
      .get(`/cultures/${CultureUtils.culture.slug}`)
    expect(response.statusCode).toBe(200)
    expect(response.body.data).toBeDefined()
  });
})
describe('GET /cultures [GET ALL CULTURES]', () => {
  beforeEach(async () => {
    await CultureUtils.createCulture(CultureUtils.culture)
  })
  afterEach(async () => {
    await CultureUtils.deleteCulture(CultureUtils.culture.slug)
  })
  it('should can get all cultures', async () => {
    const response = await supertest(app).get('/cultures')
    expect(response.statusCode).toBe(200)
    expect(response.body.data).toBeDefined()
  });
})
describe('POST /cultures/:slug/favorite', () => {
  beforeEach(async () => {
    await UserUtils.createUser(UserUtils.user_a)
    await CultureUtils.createCulture(CultureUtils.culture)
  })
  afterEach(async () => {
    await CultureUtils.deleteCulture(CultureUtils.culture.slug)
    await UserUtils.deleteAllTestUser(UserUtils.user_a.username)
  })
  it('should cannot favorite: no token', async () => {
    const response = await supertest(app)
      .post(`/cultures/${CultureUtils.culture.slug}/favorite`)
    expect(response.statusCode).toBe(403)
    expect(response.body.errors).toBeDefined()
  })
  it('should cannot favorite: invalid token', async () => {
    const response = await supertest(app)
      .post(`/cultures/${CultureUtils.culture.slug}/favorite`)
      .auth('invalidToken', { type: 'bearer' })
    expect(response.statusCode).toBe(403)
    expect(response.body.errors).toBeDefined()
  })
  it('should cannot favorite: no culture found', async () => {
    const { username, password } = UserUtils.user_a
    const userLogin = await UserUtils.loginUser({ username, password })
    const response = await supertest(app)
      .post(`/cultures/invalidSlug/favorite`)
      .auth(userLogin.data.accessToken, { type: 'bearer' })
    expect(response.statusCode).toBe(404)
    expect(response.body.errors).toBeDefined()
  })
  it('should can favorite', async () => {
    const { username, password } = UserUtils.user_a
    const userLogin = await UserUtils.loginUser({ username, password })
    const response = await supertest(app)
      .post(`/cultures/${CultureUtils.culture.slug}/favorite`)
      .auth(userLogin.data.accessToken, { type: 'bearer' })
    expect(response.statusCode).toBe(200)
    expect(response.body.data).toBeDefined()
    await CultureUtils.deleteFavorited( UserUtils.user_a.username, CultureUtils.culture.slug)
  })
})
describe('DELETE /cultures/:slug/unfavorite', () => {
  beforeEach(async () => {
    await UserUtils.createUser(UserUtils.user_a)
    await CultureUtils.createCulture(CultureUtils.culture)
  })
  afterEach(async () => {
    await CultureUtils.deleteCulture(CultureUtils.culture.slug)
    await UserUtils.deleteAllTestUser(UserUtils.user_a.username)
  })
  it('should cannot unfavorite: no token', async () => {
    const response = await supertest(app)
      .delete(`/cultures/${CultureUtils.culture.slug}/unfavorite`)
    expect(response.statusCode).toBe(403)
    expect(response.body.errors).toBeDefined()
  })
  it('should cannot unfavorite: invalid token', async () => {
    const response = await supertest(app)
      .delete(`/cultures/${CultureUtils.culture.slug}/unfavorite`)
      .auth('invalidToken', { type: 'bearer' })
    expect(response.statusCode).toBe(403)
    expect(response.body.errors).toBeDefined()
  })
  it('should cannot unfavorite: no favorited before', async () => {
    const { username, password } = UserUtils.user_a
    const userLogin = await UserUtils.loginUser({ username, password })
    const response = await supertest(app).delete(`/cultures/${CultureUtils.culture.slug}/unfavorite`)
      .auth(userLogin.data.accessToken, { type: 'bearer'})
    expect(response.statusCode).toBe(404)
    expect(response.body.errors).toBeDefined()
  })
  it('should can unfavorite', async () => {
    await CultureUtils.createFavorite(UserUtils.user_a.username, CultureUtils.culture.slug)
    const { username, password } = UserUtils.user_a
    const userLogin = await UserUtils.loginUser({ username, password })

    const response = await supertest(app)
      .delete(`/cultures/${cultureUtils.culture.slug}/unfavorite`)
      .auth(userLogin.data.accessToken, { type: 'bearer' })

    expect(response.statusCode).toBe(200)
    expect(response.body.data).toBeDefined()
  })
})
describe('POST /cultures/:slug/comment', () => {
  beforeEach(async () => {
    await UserUtils.createUser(UserUtils.user_a)
    await CultureUtils.createCulture(CultureUtils.culture)
  })
  afterEach(async () => {
    await UserUtils.deleteAllTestUser(UserUtils.user_a.username)
    await CultureUtils.deleteCulture(CultureUtils.culture.slug)
  })
  it('should cannot comment: no token', async () => {
    const response = await supertest(app)
      .post(`/cultures/${CultureUtils.culture.slug}/favorite`)
      .send({ body: '' })
    expect(response.statusCode).toBe(403)
    expect(response.body.errors).toBeDefined()
  })
  it('should cannot comment: invalid token', async () => {
    const response = await supertest(app)
      .post(`/cultures/${CultureUtils.culture.slug}/favorite`)
      .send({ body: '' })
      .auth('invalidToken', { type: 'bearer' })
    expect(response.statusCode).toBe(403)
    expect(response.body.errors).toBeDefined()
  })
  it('should cannot comment: no parent id found', async () => {
    const { username, password } = UserUtils.user_a
    const loginUser = await UserUtils.loginUser({ username, password })
    const response = await supertest(app)
      .post(`/cultures/${CultureUtils.culture.slug}/comment`)
      .send({ body: CultureUtils.commentBody, parentId: 'invalidParentId' })
      .auth(loginUser.data.accessToken, { type: 'bearer' })
    expect(response.statusCode).toBe(404)
    expect(response.body.errors).toBeDefined()
  })
  it('should cannot comment: no body', async () => {
    const { username, password } = UserUtils.user_a
    const loginUser = await UserUtils.loginUser({ username, password })
    const response = await supertest(app)
      .post(`/cultures/${CultureUtils.culture.slug}/comment`)
      .send({ })
      .auth(loginUser.data.accessToken, { type: 'bearer' })
    expect(response.statusCode).toBe(400)
    expect(response.body.errors).toBeDefined()
  })
  it('should cannot comment: no culture', async () => {
    const { username, password } = UserUtils.user_a
    const loginUser = await UserUtils.loginUser({ username, password })
    const response = await supertest(app)
      .post(`/cultures/invalidSlug/comment`)
      .send({ body: CultureUtils.commentBody, parentId: 'invalidParentId' })
      .auth(loginUser.data.accessToken, { type: 'bearer' })
    expect(response.statusCode).toBe(404)
    expect(response.body.errors).toBeDefined()
  })
  it('should can comment', async () => {
    const { username, password } = UserUtils.user_a
    const loginUser = await UserUtils.loginUser({ username, password })
    const response = await supertest(app)
      .post(`/cultures/${CultureUtils.culture.slug}/comment`)
      .send({ body: CultureUtils.commentBody })
      .auth(loginUser.data.accessToken, { type: 'bearer' })
    expect(response.statusCode).toBe(200)
    expect(response.body.data).toBeDefined()
  })
  it('should can reply comment', async () => {
    const { username, password } = UserUtils.user_a
    const loginUser = await UserUtils.loginUser({ username, password })
    const comment = await CultureUtils.createComment(loginUser.data.accessToken, UserUtils.user_a, CultureUtils.culture)
    const response = await supertest(app)
      .post(`/cultures/${CultureUtils.culture.slug}/comment`)
      .send({ body: CultureUtils.commentBody, parentId: comment.data.id })
      .auth(loginUser.data.accessToken, { type: 'bearer' })
    expect(response.statusCode).toBe(200)
    expect(response.body.data).toBeDefined()
  })
})
describe('DELETE /cultures/:slug/uncomment', () => {
  beforeEach(async () => {
    await UserUtils.createUser(UserUtils.user_a)
    await UserUtils.createUser(UserUtils.user_b)
    await CultureUtils.createCulture(CultureUtils.culture)
  })
  afterEach(async () => {
    await UserUtils.deleteAllTestUser(UserUtils.user_a.username)
    await UserUtils.deleteAllTestUser(UserUtils.user_b.username)
    await CultureUtils.deleteCulture(CultureUtils.culture.slug)
  })
  it('should cannot uncomment: no token', async () => {
    const response = await supertest(app)
      .delete(`/cultures/${CultureUtils.culture.slug}/uncomment`)
      .send({ body: '' })

    expect(response.statusCode).toBe(403)
    expect(response.body.errors).toBeDefined()
  })
  it('should cannot uncomment: invalid token', async () => {
    const response = await supertest(app)
      .delete('/cultures/invalidSlug/uncomment')
      .send({ body: '' })
      .auth('invalidToken', { type: 'bearer' })

    expect(response.statusCode).toBe(403)
    expect(response.body.errors).toBeDefined()
  })
  it('should cannot uncomment: no comment found', async () => {
    const { username, password } = UserUtils.user_a
    const userLogin = await UserUtils.loginUser({ username, password })
    const response = await supertest(app)
      .delete(`/cultures/${CultureUtils.culture.slug}/uncomment`)
      .send({ id: 'invalidId' })
      .auth(userLogin.data.accessToken, { type: 'bearer' })

    expect(response.statusCode).toBe(404)
    expect(response.body.errors).toBeDefined()
  })
  it('should cannot uncomment: unauthenticated', async () => {
    const user_1 = await UserUtils.loginUser({ username: UserUtils.user_a.username, password: UserUtils.user_b.password})
    const user_2 = await UserUtils.loginUser({ username: UserUtils.user_b.username, password: UserUtils.user_b.password})
    const comment = await cultureUtils.createComment(user_1.data.accessToken, UserUtils.user_a, CultureUtils.culture)
    const response = await supertest(app)
      .delete(`/cultures/${CultureUtils.culture.slug}/uncomment`)
      .send({ id: comment.data.id })
      .auth(user_2.data.accessToken, { type: 'bearer' })

    expect(response.statusCode).toBe(401)
    expect(response.body.errors).toBeDefined()
  })
  it('should can uncomment', async () => {
    const { username, password } = UserUtils.user_a
    const userLogin = await UserUtils.loginUser({ username, password })
    const comment = await CultureUtils.createComment(userLogin.data.accessToken, UserUtils.user_a, CultureUtils.culture)

    const response = await supertest(app)
      .delete(`/cultures/${CultureUtils.culture.slug}/uncomment`)
      .send({ id: comment.data.id })
      .auth(userLogin.data.accessToken, { type: 'bearer' })

    expect(response.statusCode).toBe(200)
    expect(response.body.data).toBeDefined()
  })
  it('should can uncomment nested comment', async () => {
    const { username, password } = UserUtils.user_a
    const userLogin = await UserUtils.loginUser({ username, password })
    const comment = await cultureUtils.createComment(userLogin.data.accessToken, UserUtils.user_a, CultureUtils.culture)
    await cultureUtils.createComment(userLogin.data.accessToken, UserUtils.user_a, CultureUtils.culture, comment.data.id)

    const response = await supertest(app)
      .delete(`/cultures/${CultureUtils.culture.slug}/uncomment`)
      .send({ id: comment.data.id })
      .auth(userLogin.data.accessToken, { type: 'bearer' })

    expect(response.statusCode).toBe(200)
    expect(response.body.data).toBeDefined()
  });
})
