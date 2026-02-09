import mongoose, { Document, Schema } from "mongoose";
const BookSchema = new Schema({
    name: { type: String, required: true },
    author: { type: String, required: true },
    pages: { type: Number, requred: true }
});
const Book = mongoose.model('Book', BookSchema);
export { Book };
//# sourceMappingURL=Book.js.map