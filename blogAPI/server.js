const express = require('express');
const userRoute = require("./routes/user")

const app = express()

app.listen(3000, function(){
    console.log("server is running " + 3000);
    
})

app.use(express.json())

app.use(userRoute)
