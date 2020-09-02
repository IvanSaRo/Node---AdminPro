const mongoose = require('mongoose');

const dbConnection = async () => {

    try {
        
        await mongoose.connect('mongodb+srv://mean_user:MfIBoQb8Dh2zDqpF@cluster0.bkxqn.mongodb.net/HospitalDB', {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            
        });

        console.log( 'DB online' );
        
    } catch (error) {
        
        console.log( error );
        throw new Error('Error al iniciar la BD')
    }
    
    
}

module.exports = {
    dbConnection
}