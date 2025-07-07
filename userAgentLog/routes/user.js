const express = require('express')
const Route = express.Router(); 
const path = require('path')
const {getAllUser} = require('../controllers/userController');
const { getUserAgentGraph } = require("../utils/logger")
const filesRoot = path.join(__dirname, '../public');
Route.get('/', getAllUser)

Route.get('/userlogs',(req, res) => {

    const data = getUserAgentGraph()
    if(data){
        return res.json({
            UserAgentGraph : data,
            msg : "successful"
        })
    }

    return res.send("invalid req or no agent logged yet")
})

Route.get('/logs', (req, res) => {
    // res.sendFile expects an absolute path.
    // Using path.join and filesRoot ensures the correct absolute path.
    res.sendFile('index.html', { root: filesRoot }, (err) => {
        if (err) {
            console.error('Error sending index.html:', err);
            res.status(500).send('Error loading page.');
        } else {
            console.log('index.html sent successfully.');
        }
    });
});


module.exports = Route;