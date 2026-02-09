import mongoose, {Document, Schema} from "mongoose";

interface IBook extends Document {
    "name": string
    "author": string
    "pages": number
}

const BookSchema: Schema = new Schema<IBook>({
    name: {type: String, required: true},
    author: {type: String, required: true},
    pages: {type: Number, requred: true}
})

const Book: mongoose.Model<IBook> = mongoose.model<IBook>('Book', BookSchema)

export {Book}
export type {IBook}