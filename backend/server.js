const express = require('express')
const bodyparser = require('body-parser')
require('dotenv').config()
const cors = require('cors')


const { MongoClient } = require('mongodb');
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'PassGuard';

const port = 3000
const app = express()
client.connect();


app.use(bodyparser.json())
app.use(cors())



app.get('/', async (req, res) => {
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.find({}).toArray();
    res.json(findResult)
})

app.post('/', async (req, res) => {
    const password =req.body
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.insertOne(password)
    res.send({success: true, result: findResult})
})

app.delete('/', async (req, res) => {
    const password =req.body
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.deleteOne(password)
    res.send({success: true, result: findResult})
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})