const mongoose = require('mongoose');

const dbConnection = async () => {

    try {
        
        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true,
            useFindAndModify: false,
            useCreateIndex: true,
            useUnifiedTopology: true
            
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