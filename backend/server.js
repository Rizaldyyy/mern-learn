const path = require('path')
const express = require('express');
const dotenv = require('dotenv').config();
const port = process.env.PORT;

const colors = require('colors');

// Database
const connectDB = require('./config/database');
connectDB();

// Middlewares
const { errorHandler } = require('./middleware/ErrorMiddleware');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Controllers
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/goals', require('./routes/goalRoutes'));

if(process.env.NODE_ENV === 'prod'){
  app.use(express.static(path.join(__dirname, '../frontend/build')))

  app.get('*', (req, res) => 
    res.sendFile(
      path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
    )
  )
} else {
  app.get('/', (req, res) => res.send('Please set into production mode'))
}

app.use(errorHandler);

// if(port){
  app.listen(port, () => console.log(`Server started on port ${port}`));
// }

// export default app

