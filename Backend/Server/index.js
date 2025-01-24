const express = require('express')
const jwt = require('jsonwebtoken')
const app = express()
const mongoose = require('mongoose');
var cors = require('cors')


const adminRouter = require("./routes/admin");
const userRouter = require("./routes/user");

const port = 3000

app.use(express.json());
app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use("/admin", adminRouter);
app.use("/user", userRouter);

mongoose.connect('mongodb+srv://abhashkumardas29:Abhash29@authentication.1vp14.mongodb.net/Courses', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
