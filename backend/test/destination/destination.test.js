import supertest from 'supertest'
import app from '../../src/application/app.js';
import DestinationUtils from './destination-utils.js';
import UserUtils from '../user/user-utils.js';
import destinationUtils from './destination-utils.js';

describe('GET /destinations/:slug [GET A DESTINATION]', () => {
  beforeEach(async () => {
    await DestinationUtils.createCategory()
    await DestinationUtils.createDistrict()
    await DestinationUtils.createDestination(DestinationUtils.destination_a)
  })
  afterEach(async () => {
    await DestinationUtils.deleteDestination(DestinationUtils.destination_a.slug)
    await DestinationUtils.deleteCategory()
    await DestinationUtils.deleteDistrict()
  })

  it('should cannot get: invalid slug', async () => {
    const response = await supertest(app).get('/destinations/invalid')
    expect(response.statusCode).toBe(404)
    expect(response.body.errors).toBeDefined()
  })

  it('should can get', async () => {
    const response = await supertest(app).get(`/destinations/${DestinationUtils.destination_a.slug}`)
    expect(response.statusCode).toBe(200)
    expect(response.body.data).toBeDefined()
    expect(response.body.data.name).toBe(DestinationUtils.destination_a.name)
  })
})
describe('GET /destinations [GET ALL DESTINATION]', () => {
  beforeEach(async () => {
    await DestinationUtils.createCategory()
    await DestinationUtils.createDistrict()
    await DestinationUtils.createDestination(DestinationUtils.destination_a)
    await DestinationUtils.createDestination(DestinationUtils.destination_b)
  })
  afterEach(async () => {
    await DestinationUtils.deleteDestination(DestinationUtils.destination_a.slug)
    await DestinationUtils.deleteDestination(DestinationUtils.destination_b.slug)
    await DestinationUtils.deleteCategory()
    await DestinationUtils.deleteDistrict()
  })
  it('should can get all destinations', async () => {
    const response = await supertest(app).get('/destinations')
    expect(response.statusCode).toBe(200)
    expect(response.body.data).toBeDefined()
  })
  it('should can get all destinations with query: name', async () => {
    const response = await supertest(app).get(`/destinations?name=${DestinationUtils.destination_a.name}`)
    expect(response.statusCode).toBe(200)
    expect(response.body.data).toBeDefined()
  })
  it('should can get all destinations with query: district', async () => {
    const response = await supertest(app).get(`/destinations?district=${DestinationUtils.district.slug}`)
    expect(response.statusCode).toBe(200)
    expect(response.body.data).toBeDefined()
  })
})
describe('POST /destinations/:slug/favorite [FAVORITE DESTINATION]', () => {
  beforeEach(async () => {
    await DestinationUtils.createCategory()
    await DestinationUtils.createDistrict()
    await UserUtils.createUser(UserUtils.user_a)
    await DestinationUtils.createDestination(DestinationUtils.destination_a)
  })

  afterEach(async () => {
    await DestinationUtils.deleteDestination(DestinationUtils.destination_a.slug)
    await UserUtils.deleteAllTestUser(UserUtils.user_a.username)
    await DestinationUtils.deleteCategory()
    await DestinationUtils.deleteDistrict()
  })

  it('should cannot favorited: no token', async () => {
    const response = await supertest(app)
      .post(`/destinations/${DestinationUtils.destination_a.slug}/favorite`)
    expect(response.statusCode).toBe(403)
    expect(response.body.errors).toBeDefined()
  })

  it('should cannot favorited: invalid token', async () => {
    const response = await supertest(app)
      .post(`/destinations/${DestinationUtils.destination_a.slug}/favorite`)
      .auth('invalidToken', { type: 'bearer' })
    expect(response.statusCode).toBe(403)
    expect(response.body.errors).toBeDefined()
  })

  it('should cannot favorited: no destination found', async () => {
    const { username, password } = UserUtils.user_a
    const userLogin = await UserUtils.loginUser({ username, password })
    const response = await supertest(app)
      .post(`/destinations/invalidSlug/favorite`)
      .auth(userLogin.data.accessToken, { type: 'bearer' })
    expect(response.statusCode).toBe(404)
    expect(response.body.errors).toBeDefined()
  })

  it('should can favorited', async () => {
    const { username, password } = UserUtils.user_a
    const userLogin = await UserUtils.loginUser({ username, password })
    const response = await supertest(app)
      .post(`/destinations/${DestinationUtils.destination_a.slug}/favorite`)
      .auth(userLogin.data.accessToken, { type: 'bearer' })
    expect(response.statusCode).toBe(200)
    expect(response.body.data).toBeDefined()
    await DestinationUtils.deleteFavoriteDestination(destinationUtils.destination_a, UserUtils.user_a)
  })
})
describe('DELETE /destinations/:slug/unfavorite [UNFAVORITE DESTINATION]', () => {
  beforeEach(async () => {
    await DestinationUtils.createCategory()
    await DestinationUtils.createDistrict()
    await UserUtils.createUser(UserUtils.user_a)
    await DestinationUtils.createDestination(DestinationUtils.destination_a)
  })

  afterEach(async () => {
    await DestinationUtils.deleteDestination(DestinationUtils.destination_a.slug)
    await UserUtils.deleteAllTestUser(UserUtils.user_a.username)
    await DestinationUtils.deleteCategory()
    await DestinationUtils.deleteDistrict()
  })

  it('should cannot unfavorite: no token', async () => {
    const response = await supertest(app)
      .delete(`/destinations/${DestinationUtils.destination_a.slug}/unfavorite`)
    expect(response.statusCode).toBe(403)
    expect(response.body.errors).toBeDefined()
  })

  it('should cannot unfavorite: invalid token', async () => {
    const response = await supertest(app)
      .delete(`/destinations/${DestinationUtils.destination_a.slug}/unfavorite`)
      .auth('invalidToken', { type: 'bearer' })
    expect(response.statusCode).toBe(403)
    expect(response.body.errors).toBeDefined()
  })

  it('should cannot unfavorite: no favorited before', async () => {
    const { username, password } = UserUtils.user_a
    const userLogin = await UserUtils.loginUser({ username, password })
    const response = await supertest(app)
      .delete(`/destinations/${DestinationUtils.destination_a.slug}/unfavorite`)
      .auth(userLogin.data.accessToken, { type: 'bearer' })
    expect(response.statusCode).toBe(404)
    expect(response.body.errors).toBeDefined()
  })

  it('should can unfavorite', async () => {
    await DestinationUtils.createFavoriteDestination(DestinationUtils.destination_a, UserUtils.user_a)
    const { username, password } = UserUtils.user_a
    const userLogin = await UserUtils.loginUser({ username, password })
    const response = await supertest(app)
      .delete(`/destinations/${DestinationUtils.destination_a.slug}/unfavorite`)
      .auth(userLogin.data.accessToken, { type: 'bearer' })
    expect(response.statusCode).toBe(200)
    expect(response.body.data).toBeDefined()
  })
})
describe('POST /destinations/:slug/comment [COMMENT DESTINATION]', () => {
  beforeEach(async () => {
    await DestinationUtils.createCategory()
    await DestinationUtils.createDistrict()
    await UserUtils.createUser(UserUtils.user_a)
    await DestinationUtils.createDestination(DestinationUtils.destination_a)
  })
  afterEach(async () => {
    await DestinationUtils.deleteComment()
    await DestinationUtils.deleteDestination(DestinationUtils.destination_a.slug)
    await UserUtils.deleteAllTestUser(UserUtils.user_a.username)
    await DestinationUtils.deleteCategory()
    await DestinationUtils.deleteDistrict()
  })
  it('should cannot comment: no token', async () => {
    const response = await supertest(app)
      .post(`/destinations/${DestinationUtils.destination_a.slug}/comment`)
      .send({ body: '' })

    expect(response.statusCode).toBe(403)
    expect(response.body.errors).toBeDefined()
  })
  it('should cannot comment: invalid token', async () => {
    const response = await supertest(app)
      .post(`/destinations/${DestinationUtils.destination_a.slug}/comment`)
      .send({ body: '' })
      .auth('invalidToken', { type: 'bearer' })

    expect(response.statusCode).toBe(403)
    expect(response.body.errors).toBeDefined()
  })
  it('should cannot comment: parent id not found', async () => {
    const { username, password } = UserUtils.user_a
    const loginUser = await UserUtils.loginUser({ username, password })

    const response = await supertest(app)
      .post(`/destinations/${DestinationUtils.destination_a.slug}/comment`)
      .send({ body: DestinationUtils.commentBody, parentId: 'invalidParentId' })
      .auth(loginUser.data.accessToken, { type: 'bearer' })

    expect(response.statusCode).toBe(404)
    expect(response.body.errors).toBeDefined()
  })
  it('should cannot comment: no body', async () => {
    const { username, password } = UserUtils.user_a
    const loginUser = await UserUtils.loginUser({ username, password })

    const response = await supertest(app)
      .post(`/destinations/${DestinationUtils.destination_a.slug}/comment`)
      .send({  })
      .auth(loginUser.data.accessToken, { type: 'bearer' })

    expect(response.statusCode).toBe(400)
    expect(response.body.errors).toBeDefined()
  })
  it('should cannot comment: no destination', async () => {
    const { username, password } = UserUtils.user_a
    const loginUser = await UserUtils.loginUser({ username, password })

    const response = await supertest(app)
      .post(`/destinations/invalidSlig/comment`)
      .send({ body: DestinationUtils.commentBody })
      .auth(loginUser.data.accessToken, { type: 'bearer' })

    expect(response.statusCode).toBe(404)
    expect(response.body.errors).toBeDefined()
  })
  it('should can comment', async () => {
    const { username, password } = UserUtils.user_a
    const loginUser = await UserUtils.loginUser({ username, password })

    const response = await supertest(app)
      .post(`/destinations/${destinationUtils.destination_a.slug}/comment`)
      .send({ body: DestinationUtils.commentBody })
      .auth(loginUser.data.accessToken, { type: 'bearer' })

    expect(response.statusCode).toBe(200)
    expect(response.body.data).toBeDefined()
  })
  it('should can reply comment', async () => {
    const { username, password } = UserUtils.user_a
    const loginUser = await UserUtils.loginUser({ username, password })
    const comment = await DestinationUtils.createCommentDestination(loginUser.data.accessToken, UserUtils.user_a, DestinationUtils.destination_a)
    const response = await supertest(app)
      .post(`/destinations/${destinationUtils.destination_a.slug}/comment`)
      .send({ body: DestinationUtils.commentBody, parentId: comment.data.id })
      .auth(loginUser.data.accessToken, { type: 'bearer' })

    expect(response.statusCode).toBe(200)
    expect(response.body.data).toBeDefined()
  })
})
describe('DELETE /destinations/:slug/uncomment [UNCOMMENT DESTINATION]', () => {
  beforeEach(async () => {
    await DestinationUtils.createCategory()
    await DestinationUtils.createDistrict()
    await UserUtils.createUser(UserUtils.user_a)
    await UserUtils.createUser(UserUtils.user_b)
    await DestinationUtils.createDestination(DestinationUtils.destination_a)
  })
  afterEach(async () => {
    await DestinationUtils.deleteComment()
    await DestinationUtils.deleteDestination(DestinationUtils.destination_a.slug)
    await UserUtils.deleteAllTestUser(UserUtils.user_a.username)
    await UserUtils.deleteAllTestUser(UserUtils.user_b.username)
    await DestinationUtils.deleteCategory()
    await DestinationUtils.deleteDistrict()
  })
  it('should cannot uncomment: no token', async () => {
    const response = await supertest(app)
      .delete(`/destinations/${DestinationUtils.destination_a.slug}/uncomment`)
      .send({ body: '' })

    expect(response.statusCode).toBe(403)
    expect(response.body.errors).toBeDefined()
  })
  it('should cannot uncomment: destination not found', async () => {
    const { username, password } = UserUtils.user_a
    const userLogin = await UserUtils.loginUser({ username, password })
    const comment = await DestinationUtils.createCommentDestination(userLogin.data.accessToken, UserUtils.user_a, DestinationUtils.destination_a)
    const response = await supertest(app)
      .delete('/destinations/invalidSlug/uncomment')
      .send({ id: comment.data.id })
      .auth(userLogin.data.accessToken, { type: 'bearer' })

    expect(response.statusCode).toBe(404)
    expect(response.body.errors).toBeDefined()
  })
  it('should cannot uncomment: no comment found', async () => {
    const { username, password } = UserUtils.user_a
    const userLogin = await UserUtils.loginUser({ username, password })
    const response = await supertest(app)
      .delete(`/destinations/${DestinationUtils.destination_a.slug}/uncomment`)
      .send({ id: 'invalidId' })
      .auth(userLogin.data.accessToken, { type: 'bearer' })

    expect(response.statusCode).toBe(404)
    expect(response.body.errors).toBeDefined()
  })
  it('should cannot uncomment: unauthenticated', async () => {
    const user_1 = await UserUtils.loginUser({ username: UserUtils.user_a.username, password: UserUtils.user_b.password})
    const user_2 = await UserUtils.loginUser({ username: UserUtils.user_b.username, password: UserUtils.user_b.password})
    const comment = await DestinationUtils.createCommentDestination(user_1.data.accessToken, UserUtils.user_a, DestinationUtils.destination_a)

    const response = await supertest(app)
      .delete(`/destinations/${DestinationUtils.destination_a.slug}/uncomment`)
      .send({ id: comment.data.id })
      .auth(user_2.data.accessToken, { type: 'bearer' })

    expect(response.statusCode).toBe(401)
    expect(response.body.errors).toBeDefined()
  })
  it('should can uncomment', async () => {
    const { username, password } = UserUtils.user_a
    const userLogin = await UserUtils.loginUser({ username, password })
    const comment = await DestinationUtils.createCommentDestination(userLogin.data.accessToken, UserUtils.user_a, DestinationUtils.destination_a)

    const response = await supertest(app)
      .delete(`/destinations/${DestinationUtils.destination_a.slug}/uncomment`)
      .send({ id: comment.data.id })
      .auth(userLogin.data.accessToken, { type: 'bearer' })

    expect(response.statusCode).toBe(200)
    expect(response.body.data).toBeDefined()
  })
  it('should can uncomment nested comment', async () => {
    const { username, password } = UserUtils.user_a
    const userLogin = await UserUtils.loginUser({ username, password })
    const comment = await DestinationUtils.createCommentDestination(userLogin.data.accessToken, UserUtils.user_a, DestinationUtils.destination_a)
    await DestinationUtils.createCommentDestination(userLogin.data.accessToken, UserUtils.user_a, DestinationUtils.destination_a, comment.data.id)

    const response = await supertest(app)
      .delete(`/destinations/${DestinationUtils.destination_a.slug}/uncomment`)
      .send({ id: comment.data.id })
      .auth(userLogin.data.accessToken, { type: 'bearer' })

    expect(response.statusCode).toBe(200)
    expect(response.body.data).toBeDefined()
  })
})
