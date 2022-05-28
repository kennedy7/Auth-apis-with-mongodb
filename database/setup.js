const mongoose = require ('mongoose');
const connectionString = process.env.DB_URL;

module.exports = function(){
    mongoose.connect(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology:true,
        useFindAndModify: false,
        useCreateIndex: true
    }).then(
         console.log('database connection successful')
    
)
    }
