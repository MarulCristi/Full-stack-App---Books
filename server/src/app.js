import express, {} from 'express';
import mongoose from 'mongoose';
import path from 'path';
import { Book } from "./models/Book.js";
const app = express();
const port = 1234;
app.use(express.json());
console.log("Server is running");
const mongoDB = "mongodb://127.0.0.1:27017/testdb";
mongoose.connect(mongoDB);
mongoose.Promise = Promise;
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error"));
app.post("/api/book", async (req, res) => {
    const { author, name, pages } = req.body;
    if (!author || !name || !pages) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    let newBook;
    try {
        newBook = new Book({ name, author, pages });
        await newBook.save();
        res.status(201).json({ message: 'Book added successfully', book: newBook });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to add book', error: error.message });
    }
});
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
});
app.listen(port, async () => {
    console.log(`Server is listening on port ${port}`);
});
//# sourceMappingURL=app.js.map