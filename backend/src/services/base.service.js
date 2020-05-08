// Clase que contiene un conjunto de metodos utiles para el resto de clases del proyecto
class BaseService {
    constructor(obj) {
        this.obj = obj;
    }

    async get(id) {
        if (!id) {
            const error = new Error();
            error.status = 400;
            error.message = 'id must be sent';
            throw error;
        }
        // else if (id == 'null') {
        //     return null
        // }
        
        // en caso de que exista la id vamos a buscar esa entidad
        const currentEntity = await this.obj.get(id);
        console.log(currentEntity)

        // JSON.stringify(currentEntity);
        console.log(currentEntity)
        if (!currentEntity) {
            return null;
        }
        return currentEntity;
    }



    // obtener todos las entidades 
    async getAll() {
        return await this.obj.getAll();
    }

    // crear una entidad nueva
    async create(entity) {

        return await this.obj.create(entity);
    }

    // actualizar una entidad por id
    async update(id, entity) {
        if (!id) {
            const error = new Error();
            error.status = 400;
            error.message = 'id must be sent';
            throw error;
        }
        return await this.obj.update(id, entity);
    }

    // borrar un elemento por su id
    async delete(id) {
        if (!id) {
            const error = new Error();
            error.status = 400;
            error.message = 'id must be sent';

            throw error;
        }

        return await this.obj.delete(id);
    }

}

module.exports = BaseService;;