import database from '../../src/application/database.js';
import supertest from 'supertest';
import app from '../../src/application/app.js';

class CultureUtils {
  static commentBody = 'test-jest-123'
  static culture = {
    name: 'culture test',
    slug: 'culture-test',
    description: 'culture test'
  }
  static async createCulture(culture) {
    await database.culture.create({
      data: {
        name: culture.name,
        slug: culture.slug,
        description: culture.description
      }
    })
  }
  static async createFavorite(username, slug) {
    await database.usersFavoriteCultures.create({
      data: {
        username,
        cultureSlug: slug
      }
    })
  }
  static async createComment(token, user, culture, parentId) {
    const response = await supertest(app)
      .post(`/cultures/${culture.slug}/comment`)
      .send({ body: this.commentBody, parentId })
      .auth(token, { type: 'bearer' })
    return response.body
  }
  static async deleteFavorited(username, slug) {
    await database.usersFavoriteCultures.delete({
      where: {
        username_cultureSlug: {
          username,
          cultureSlug: slug
        }
      }
    })
  }
  static async deleteCulture(slug) {
    await database.culture.deleteMany({
      where: {
        slug
      }
    })
  }
}

export default CultureUtils
