import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

export default function HomePage() {
  const [name, setName] = useState('');
  const [author, setAuthor] = useState('');
  const [pages, setPages] = useState('');
  const navigate = useNavigate();

  const fetchData = async (e: any) => {
    e.preventDefault();

    const book = {
      name,
      author,
      pages: parseInt(pages, 10)
    };
    try {
      const response = await fetch("http://localhost:1234/api/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(book)
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Book added:", data);
        setName('');
        setAuthor('');
        setPages('');
        // Navigate to the book detail page
        navigate(`/book/${name}`);
      } else {
        console.log("Failed to add book");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <>
      <h1>books</h1>
      <form onSubmit={fetchData}>
        <input
          type="text"
          id="name"
          placeholder='Name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          id="author"
          placeholder='Author'
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
        <input
          type="number"
          id="pages"
          placeholder='Pages'
          value={pages}
          onChange={(e) => setPages(e.target.value)}
          required
        />
        <input type="submit" value="Submit" id="submit" />
      </form>
    </>
  );
}