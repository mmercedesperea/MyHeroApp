/**
 * Base class service, Our services indicated what actions should be taken according to the data that we receive from the different requests to our api controller
 * Class that contains a set of useful methods for the rest of the project's classes
 */
class BaseService {
  constructor(obj) {
    this.obj = obj
  }

  /**
   * Get by id
   * @param {number} id
   * @returns {(Array | null)}
   */
  async get(id) {
    if (!id) {
      const error = new Error()
      error.status = 400
      error.message = 'id must be sent'
      throw error
    }
    const currentEntity = await this.obj.get(id)
    if (!currentEntity) {
      return null
    }
    return currentEntity
  }

  /**
   * Get all
   * @returns {Array}
   */
  async getAll() {
    return await this.obj.getAll()
  }

  /**
   * Create an element
   * @param {object} entity body of the element that brings the path
   * @returns {string}  message
   */
  async create(entity) {
    return await this.obj.create(entity)
  }

  /**
   * update an element
   * @param {number} id
   * @param {object} entity of the element that brings the path
   * @returns {string}  message
   */
  async update(id, entity) {
    if (!id) {
      const error = new Error()
      error.status = 400
      error.message = 'id must be sent'
      throw error
    }
    return await this.obj.update(id, entity)
  }

  /**
   * Delete by id
   * @param {number} id
   * @returns {string}  message
   */
  async delete(id) {
    if (!id) {
      const error = new Error()
      error.status = 400
      error.message = 'id must be sent'

      throw error
    }

    return await this.obj.delete(id)
  }
}

module.exports = BaseService
