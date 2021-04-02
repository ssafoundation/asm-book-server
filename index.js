

const express = require('express')
const app = express()
const ObjectID=require('mongodb').ObjectID
require('dotenv').config()
const cors = require('cors');
const BodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASS}@cluster0.tflxr.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const port = process.env.PORT || 4200


app.use(cors());
app.use(BodyParser.json());
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const bookCollection = client.db("AsmBook").collection("books");
    const ordersCollection = client.db("AsmBook").collection("orders");
    app.post('/addbook', (req, res) => {
        const books = req.body;
        console.log(books);
        bookCollection.insertOne(books)
            .then(result => {
                res.send(result)
                console.log(result);
        })
    })
// person orson
    app.post('/addOrder', (req, res) => {
        const order = req.body;
        console.log(order);
        ordersCollection.insertOne(order)
            .then(result => {
                console.log(result);
                res.send(result)
                // res.redirect('/')
               
            })
    })
    // show data single person 
    app.get('/showOrder', (req, res) => {
        console.log(req.query.email);
        ordersCollection.find({email: req.query.email})
            .toArray((err, items) => {
                res.send(items);

            })
    })

// show data home page 
    app.get('/showbook', (req, res) => {
        bookCollection.find()
            .toArray((err, items) => {
                res.send(items);
                
        })
    })
    app.get('/checkout/:id', (req, res) => {
        const bookID = req.params.id;
        bookCollection.find({ _id: ObjectID(bookID) })
            .toArray((err, book) => {
            res.send(book)
        })
    })

    app.get('/showbook/:id', (req, res) => {
        collection.find({ key: req.params.key })
            .toArray((err, documents) => {
                res.send(documents[0])
            })
    })

    app.delete('/delete/:id', (req, res) => {
        const id = ObjectID(req.params.id)
        console.log(id);
        bookCollection.deleteOne({ _id: id })
            .then(documents => {
                res.send(documents.deletedCount>0)
            })
    })
    
});
// app.get('/', (req, res) => {
//     res.send('Hello World!')
// })

app.listen(port)