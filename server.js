// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
//**bodyParser is deprecated express**
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 8000;
const server = app.listen(port, function () {
    console.log(`server is running at port ${port}`);
});

app.get('/allData', (req, res) => {
    res.send(projectData);
});

app.get('/aboutus', (req, res) => {
    res.send('contact us at ...')
})
app.post('/addData', (req, res) => {
    console.log('hi')
    console.log(req.body)
    console.log('server side data');
    projectData = req.body
    res.end();
});