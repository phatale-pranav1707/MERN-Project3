const connectToMongo=require('./db')
const express = require('express')
var cors=require('cors')
const app=express()
const port = 5000

connectToMongo();

app.use(express.json())
app.use(cors())

app.use('/api/auth',require('./routers/auth'))
app.use('/api/notes',require('./routers/note'))



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});





