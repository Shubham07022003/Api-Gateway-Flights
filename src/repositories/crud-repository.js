const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/errors/app.error");

//const{Logger} = require(' ../config');
class Crudrepository
{
    constructor(model) {
        this.model = model;
    }

    async create(data){
        
            const response = await this.model.create(data);
            return response;
    }
       
    async destroy(data){
       
            const response = await this.model.destroy({
                where:{
                    id: data
                }
            });
            if(!response){
                throw new AppError('not able to find  delete the resources',StatusCodes.NOT_FOUND)
            }
             return response;
        }
     async get(data){
        
            const response = await this.model.findByPk(data);
            if(!response){
                throw new AppError('not able to find the resources',StatusCodes.NOT_FOUND)
            }
            return response;
        }     
    async getAll(){
        
            const response = await this.model.findAll();
            return response;
        } 
    async update(data, id){ // data-> {col :value,...}
       
            const response = await this.model.update(data ,{
                where:{
                    id: id
                },
                returning: true
            });
            if(response[0] === 0) {
                throw new AppError('Resource not found', StatusCodes.NOT_FOUND);
            }
            const updatedRecord =  this.get(id)
            return updatedRecord;
           
    
            return response;
        } 
    

}

module.exports = Crudrepository;
