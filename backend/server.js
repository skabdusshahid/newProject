
// const express = require('express');
// const cors = require('cors');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');

// const app = express();
// const PORT = 5000;

// // MongoDB URI
// const MONGODB_URI = 'mongodb://localhost:27017/mydatabase';

// // Connect to MongoDB
// mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('MongoDB connected'))
//     .catch(err => console.error('MongoDB connection error:', err));

// // Define User Schema
// const userSchema = new mongoose.Schema({
//     username: { type: String, required: true, unique: true },
//     password: { type: String, required: true } // Passwords should be hashed in production
// });
// const User = mongoose.model('User', userSchema);

// // Define Form Data Schema
// const formDataSchema = new mongoose.Schema({
//     field1: String,
//     field2: String,
//     // Add more fields as needed
// });
// const FormData = mongoose.model('FormData', formDataSchema);

// app.use(express.json());
// app.use(bodyParser.json());

// // Configure CORS
// app.use(cors({
//     origin: 'http://localhost:5173', // Your React frontend URL
//     methods: ['GET', 'POST'],
//     credentials: true
// }));

// // Login route
// app.post('/login', async (req, res) => {
//     const { username, password } = req.body;

//     try {
//         const user = await User.findOne({ username });
//         if (user && user.password === password) {
//             res.json({ message: 'Logged in successfully' });
//         } else {
//             res.status(401).send('Invalid credentials');
//         }
//     } catch (error) {
//         console.error('Login error:', error);
//         res.status(500).send('Server error');
//     }
// });

// // Route to handle form submissions
// app.post('/submit-form', async (req, res) => {
//     const { field1, field2 } = req.body; // Extract fields from request body

//     try {
//         // Save form data to MongoDB
//         await FormData.create({ field1, field2 });
//         res.json({ message: 'Form data saved successfully' });
//     } catch (error) {
//         console.error('Error saving form data:', error);
//         res.status(500).send('Server error');
//     }
// });


// // Route to fetch form data
// app.get('/form', async (req, res) => {
//     try {
//         const formData = await FormData.find();
//         res.json(formData);
//     } catch (error) {
//         console.error('Error fetching form data:', error);
//         res.status(500).send('Server error');
//     }
// });


// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });



// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


// Define User Schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true } // Passwords should be hashed in production
});
const User = mongoose.model('User', userSchema);

const formSchema = new mongoose.Schema({
  name: String,
  email: String,
});

const FormModel = mongoose.model('Form', formSchema);

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (user && user.password === password) {
      res.status(200).json({ message: 'Login successful' });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error checking credentials' });
  }
});



app.post('/form', async (req, res) => {
  try {
    const formData = new FormModel(req.body);
    await formData.save();
    res.status(200).send('Data submitted successfully');
  } catch (error) {
    res.status(500).send('Error submitting data');
  }
});

app.get('/form', async (req, res) => {
  try {
    const formData = await FormModel.find();
    res.json(formData);
  } catch (error) {
    res.status(500).send('Error fetching data');
  }
});


app.delete('/form/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await FormModel.findByIdAndDelete(id);
    res.status(200).send('Data deleted successfully');
  } catch (error) {
    res.status(500).send('Error deleting data');
  }
});

app.put('/form/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    await FormModel.findByIdAndUpdate(id, updatedData);
    res.status(200).send('Data updated successfully');
  } catch (error) {
    res.status(500).send('Error updating data');
  }
});



app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
