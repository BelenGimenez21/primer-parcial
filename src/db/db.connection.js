const mongoose = require('mongoose');

const URI_MONGODB = process.env.URI_MONGODB;

const dbConnect = () => {
    try {
        mongoose.connect(URI_MONGODB, {useNewUrlParser: true, useUnifiedTopology: true});
        console.log('Base de datos conectada')
    } catch (error) {
        console.log('Error al conectar la base de datos', error.message)
    }
};

module.exports = dbConnect;