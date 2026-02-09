import mongoose, { Document } from "mongoose";
interface IBook extends Document {
    "name": string;
    "author": string;
    "pages": number;
}
declare const Book: mongoose.Model<IBook>;
export { Book };
export type { IBook };
//# sourceMappingURL=Book.d.ts.map