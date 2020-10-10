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

app.post(`/${process.env.DELETE_ROUTE}`, async(req, res) => {
    try {
        await userModel.deleteMany({});
        await listsModel.deleteMany({});
        await tasksModel.deleteMany({});
        res.json({
            msg: "deleted all collections"
        })
    } catch (error) {
        res.json({
            error
        })
    }

})

const authRoute = require('./routes/auth.route');
const listsRoute = require('./routes/lists.route');
const tasksRoute = require('./routes/tasks.route');
const userModel = require('./models/user.model');
const listsModel = require('./models/lists.model');
const tasksModel = require('./models/tasks.model');

app.use('/auth', authRoute);
app.use('/tasks', tasksRoute);
app.use('/lists', listsRoute);


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