// Import packages.
import mongoose from 'mongoose';
import express from 'express';
import bodyParser from 'body-parser';

// Import routes.
import api from 'routes/api';

// Configure application based on express.
const app = express();

// Add bodyparser to receive json in req.body.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connect to MongoDB.
mongoose.connect('mongodb://localhost:27017/internships', { useMongoClient: true });
mongoose.Promise = global.Promise;

// Add routes.
app.use('/api', api);

// 404 route.
app.use((req, res, next) => {
    res.status(404).send();
});

// Start server.
app.listen(3000, () => console.log('Server started'));