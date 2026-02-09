
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

interface Book {
    _id: string;
    name: string;
    author: string;
    pages: number
}

const Book = () => {
    const { bookName } = useParams();
    const [book, setBook] = useState<Book | null>();

    useEffect(() => {
        const fetchBook = async() => {
            try {
                const response = await fetch(`http://localhost:1234/api/book/${bookName}`);
                if(response.ok) {
                    const data = await response.json();
                    setBook(data);
                } else {
                    setBook(null)
                }
            } catch (error) {
                console.log("error fetching book:", error);
                setBook(null);
            }
        }
        fetchBook();
    }, [bookName])

    if (!book) {
        return (
        <div>
            <h2>Books</h2>
            <p>404: this is not the webpage you are looking for</p>
        </div>
        );
    }

    return (
        <>
            <h2><b>Books</b></h2>
            <p>{book.name}</p>
            <p>{book.author}</p>
            <p>{book.pages}</p>
        </>
    )
}

export default Book