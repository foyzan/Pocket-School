const express = require('express')
const PORT = "5000"
const app = express()
const cors = require('cors')
const UserRoute = require("./routes/user")
const {isValid, checkUserAgent} = require('./middleware/valid')

app.use(express.json())
app.use(cors())
app.use(checkUserAgent)
app.use('/user', isValid,UserRoute)


app.listen(PORT, function(){
    console.log("server is running on " + PORT);
})