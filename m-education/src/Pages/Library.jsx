import React, { useState, useEffect, useContext } from "react";
import DataContext from "../Context/DataContext";
import axios from "axios";

function BookDisplay() {
  const { headerState, setHeaderState } = useContext(DataContext);

  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("Adventures");
  const [selectedBookText, setSelectedBookText] = useState("");
  const [selectedBookTitle, setSelectedBookTitle] = useState("");
  const [selectedBookCover, setSelectedBookCover] = useState("");

  useEffect(() => {
    setHeaderState(false);
  }, [headerState]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(
          `https://gutendex.com/books/?search=${searchTerm}`
        );
        setBooks(response.data.results.slice(0, 5));
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, [searchTerm]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleBookChange = async (book) => {
    try {
      if (book.formats["text/plain"]) {
        const textResponse = await axios.get(book.formats["text/plain"]);
        setSelectedBookText(textResponse.data);
        setSelectedBookTitle(book.title);

        if (book.id) {
          const openLibraryResponse = await axios.get(
            `https://openlibrary.org/search.json?q=gutenberg:${book.id}`
          );
          if (
            openLibraryResponse.data.docs.length > 0 &&
            openLibraryResponse.data.docs[0].cover_i
          ) {
            setSelectedBookCover(
              `https://covers.openlibrary.org/b/id/${openLibraryResponse.data.docs[0].cover_i}-M.jpg`
            );
          } else {
            setSelectedBookCover("");
          }
        } else {
          setSelectedBookCover("");
        }
      } else {
        setSelectedBookText("Text version not available");
        setSelectedBookTitle(book.title);
        setSelectedBookCover("");
      }
    } catch (error) {
      console.error("Error fetching book text:", error);
      setSelectedBookText("Error loading book");
      setSelectedBookCover("");
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search for books..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <ul style={{ display: "flex", flexWrap: "wrap" }}>
        {books.map((book) => (
          <li
            key={book.id}
            onClick={() => handleBookChange(book)}
            style={{ cursor: "pointer" }}
          >
            <p>{book.title}</p>
          </li>
        ))}
      </ul>
      {selectedBookText && (
        <div style={{ padding: "20px", overflow: "auto", maxHeight: "80vh" }}>
          {selectedBookCover && (
            <img
              src={selectedBookCover}
              alt={`Cover of ${selectedBookTitle}`}
              style={{ maxWidth: "150px", marginBottom: "10px" }}
            />
          )}
          <h2>{selectedBookTitle}</h2>
          <pre>{selectedBookText}</pre>
        </div>
      )}
    </div>
  );
}

export default BookDisplay;
