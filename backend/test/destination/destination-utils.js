import database from '../../src/application/database.js';
import supertest from 'supertest';
import app from '../../src/application/app.js';

class DestinationUtils {
  static destination_a = {
    name: 'destination test a name',
    slug: 'destination-test-a-name',
    description: 'destination test a description',
    cover: 'https://google.com',
    address: 'destination test a address',
    latitude: '123445',
    longitude: '213213',
    price: 200
  }
  static destination_b = {
    name: 'destination test b name',
    slug: 'destination-test-b-name',
    description: 'destination test b description',
    cover: 'https://google.com',
    address: 'destination test b address',
    latitude: '123445',
    longitude: '213213',
    price: 200
  }
  static category = {
    name: 'category test name',
    slug: 'category-test-name',
    description: 'category test description'
  }
  static district = {
    name: 'district test name',
    slug: 'district-test-name',
    description: 'district test description'
  }
  static commentBody = 'test-jest-123'
  static async createCategory() {
    await database.category.create({ data: this.category })
  }
  static async createDistrict() {
    await database.district.create({ data: this.district })
  }
  static async createDestination(destination) {
    await database.destination.create({ data: {...destination, districtSlug: this.district.slug, categorySlug: this.category.slug }})
  }
  static async createFavoriteDestination(destination, user) {
    await database.usersFavoriteDestinations.create({
      data: {
        username: user.username,
        destinationSlug: destination.slug
      }
    })
  }
  static async createCommentDestination(token, user, destination, parentId) {
    const response = await supertest(app)
      .post(`/api/destinations/${destination.slug}/comment`)
      .send({ body: this.commentBody, parentId })
      .auth(token, { type: 'bearer' })

    return response.body
  }
  static async deleteFavoriteDestination(destination, user) {
    await database.usersFavoriteDestinations.delete({
      where: {
        username_destinationSlug: {
          destinationSlug: destination.slug,
          username: user.username
        }
      }
    })
  }
  static async deleteCategory() {
    await database.category.deleteMany({where: { slug: { contains: this.category.slug, mode: 'insensitive' }}})
  }
  static async deleteDistrict() {
    await database.district.deleteMany({where: { slug: { contains: this.district.slug, mode: 'insensitive' }}})
  }
  static async deleteDestination(slug) {
    await database.destination.delete({ where: { slug }})
  }
  static async deleteComment() {
    await database.usersCommentDestinations.deleteMany({
      where: {
        body: {
          contains: this.commentBody,
          mode: 'insensitive'
        }
      }
    })
  }
}

export default DestinationUtils
