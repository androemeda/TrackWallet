const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const colors = require('colors');
const connectDb = require('./config/connectDb');
const userRoutes = require('./routes/userRoute');
const path = require('path');
const transactionRoutes = require('./routes/transactionRoutes');

//config dotenv file
dotenv.config();

//connect db
connectDb();

//rest object
const app = express();

//middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

//routes
app.get('/', (req, res) => {
  res.send('<h1>Hello from server</h1>');
});

//port
const PORT = 8080 || process.env.PORT;

//user routes
app.use('/api/v1/users', userRoutes);

//transaction routes
app.use('/api/v1/transactions', transactionRoutes);

//static files
app.use(express.static(path.join(__dirname, './client/build')));

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, './client/build/index.html'));
});

//listen server
app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`.bgGreen);
});
