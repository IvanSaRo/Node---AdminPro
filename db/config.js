const mongoose = require('mongoose');

const dbConnection = async () => {

    try {
        
        await mongoose.connect('mongodb+srv://mean_user:******@cluster0.bkxqn.mongodb.net/HospitalDB', {
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