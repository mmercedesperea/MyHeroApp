// Clase que contiene un conjunto de metodos utiles para el resto de clases del proyecto
class BaseService {
    constructor(repository) {
        this.repository = repository;
    }

    async get(id) {
        if (!id) {
            const error = new Error();
            error.status = 400;
            error.message = 'id must be sent';
            throw error;
        }
        // en caso de que exista la id vamos a buscar esa entidad
        const currentEntity = await this.repository.get(id);
        // JSON.stringify(currentEntity);
        // console.log(currentEntity)
        if (!currentEntity) {
            const error = new Error();
            error.status = 400;
            error.message = 'Entity must be sent';
            throw error;
        }
        return currentEntity;
    }



    // obtener todos las entidades 
    async getAll() {
        return await this.repository.getAll();
    }

    // crear una entidad nueva
    async create(entity) {
        
        return await this.repository.create(entity);
    }

    // actualizar una entidad por id
    async update(id, entity) {
        if (!id) {
            const error = new Error();
            error.status = 400;
            error.message = 'id must be sent';
            throw error;
        }
        return await this.repository.update(id, entity);
    }

    // borrar un elemento por su id
    async delete(id) {
        if (!id) {
            const error = new Error();
            error.status = 400;
            error.message = 'id must be sent';

            throw error;
        }

        return await this.repository.delete(id);
    }

}

module.exports = BaseService;;