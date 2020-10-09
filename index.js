require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.json('this app works');
})

const authRoute = require('./routes/auth');
const tasksRoute = require('./routes/tasks');

app.use('/auth', authRoute);
app.use('/tasks', tasksRoute);

mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.qoybl.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('connected to database');
}).catch(error => {
    console.log(error);
})


app.listen(process.env.PORT || 3000, () => {
    console.log('server is running');
})