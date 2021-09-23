//index.js
//Import Express
let express = require('express')

//Start App
let app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }))


//Assign port
var port = process.env.PORT || 8081;
// Welcome message
app.get('/', (req, res) => res.send('Welcome to Express'));
// Launch app to the specified port
app.listen(port, function() {
    console.log("Running Rest on Port "+ port);
})

//Import routes
let apiRoutes = require("./routes/router")
//Use API routes in the App
app.use('/api', apiRoutes)

//import body parser
//let bodyParser = require('body-parser');
//configure bodyparser to hande the post requests

//Parse UR
//import mongoose
let mongoose = require('mongoose');

//connect to mongoose
const dbPath = 'mongodb://localhost/sisrae_db';
const options = {useNewUrlParser: true, useUnifiedTopology: true}
// mongoose instance connection url connection 
//mongoose.Promise = global.Promise; 
const mongo = mongoose.connect(dbPath, options);
mongo.then(() => {
    console.log('connected');
}, error => {
    console.log(error, 'error');
});