import express, { type Request, type Response } from 'express';
import mongoose from 'mongoose';
import path from 'path';
import type { Connection } from 'mongoose';
import { Book } from "./models/Book.js";
import type { IBook } from "./models/Book.js";
import cors, { type CorsOptions } from 'cors';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()
const port = 1234

app.use(express.json())

if (process.env.NODE_ENV === 'development') {
  const corsOptions: CorsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
  };

  app.use(cors(corsOptions));
} else if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, '../../client/build')))
    app.get('*', (req: Request, res: Response) => {
        res.sendFile(path.resolve(__dirname, '../../client/build/index.html'))
    })
}

console.log("Server is running")

const mongoDB: string = "mongodb://127.0.0.1:27017/testdb"
mongoose.connect(mongoDB)
mongoose.Promise = Promise
const db: Connection = mongoose.connection

db.on("error", console.error.bind(console, "MongoDB connection error"))


app.post("/api/book", async (req: Request, res: Response) => {
    const { author, name, pages }: { author: string; name: string; pages: number } = req.body;
    if (!author || !name || !pages) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    let newBook;
    try {
        newBook = new Book( {name, author, pages} )
        await newBook.save()
        res.status(201).json({ message: 'Book added successfully', book: newBook });
    } catch (error: any) {
        res.status(500).json({ message: 'Failed to add book', error: error.message });
    }

})

app.get("/api/book/:bookName", async (req: Request, res: Response) => {
    const bookName  = req.params.bookName as string;
    try {
        const book = await Book.findOne({ name: bookName });
        if (book) {
            res.status(200).json(book);
        } else {
            res.status(404).json({ message: 'Book not found' });
        }
    } catch (error: any) {
        res.status(500).json({ message: 'Failed to fetch book', error: error.message });
    }
});

app.listen(port, async () => {
    console.log(`Server is listening on port ${port}`);
});


