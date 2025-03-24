const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Database connected'))
    .catch(err => console.log(err));

const app = express();
app.use(express.json());
app.use(cors());

const itemSchema = new mongoose.Schema({ name: String });
const Item = mongoose.model('Item', itemSchema);

app.post('/items', async (req, res) => { res.json(await Item.create(req.body)); });
app.get('/items', async (req, res) => { res.json(await Item.find()); });
app.put('/items/:id', async (req, res) => { res.json(await Item.findByIdAndUpdate(req.params.id, req.body, { new: true })); });
app.delete('/items/:id', async (req, res) => { res.json(await Item.findByIdAndDelete(req.params.id)); });

app.listen(5000, () => console.log('Server running on port 5000'));