const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const colors = require('colors');
const connectDb = require('./config/connectDb');
const userRoutes = require('./routes/userRoute')

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

app.use('/api/v1/users' , userRoutes)

//listen server
app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`.bgGreen);
});