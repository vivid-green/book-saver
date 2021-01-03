import React, { useState, useEffect } from 'react';
import { MDBJumbotron, MDBBtn, MDBContainer, MDBRow, MDBCol, MDBFormInline } from "mdbreact";
import Card from '../components/Card';

const Homepage = () => {

    const [books, setBooks] = useState([]);
    const [bookSearch, setBookSearch] = useState("");

    useEffect(() => {
        if (books) {
            console.log("books from useEffect", books) 
        };
    }, [books])

    const handleSavedState = (bookId) => {
        setBooks(books.filter(book => book.id !== bookId));
    }

    const handleInputSearch = event => {
        const { value } = event.target;
        setBookSearch(value);
    };

    const handleSearchSubmit = event => {
        event.preventDefault();
        fetch(`https://www.googleapis.com/books/v1/volumes?q=${bookSearch}`)
            .then(response => response.json())
            .then(bookList => {
                setBooks(bookList.items);
            })
            .catch(error => console.log(error));
    };

    const renderBookCards = () => {
        console.log("books from renderBookCards", books);
        if (books) {
            return (
                books.map((book) => {
                    let authorList = "";
                    if (book.volumeInfo.authors) {
                        authorList = book.volumeInfo.authors.join(", ");
                    }
                    
                    let image = "";
                    if(book.volumeInfo.imageLinks) {

                        if(book.volumeInfo.imageLinks.thumbnail) {
                            image = book.volumeInfo.imageLinks.thumbnail;
                        } else {
                            image = book.volumeInfo.imageLinks.smallThumbnail;
                        }
                    }

                    return <Card
                        key={book.id}
                        bookId={book.id}
                        title={book.volumeInfo.title}
                        img={image}
                        authors={authorList}
                        desc={book.volumeInfo.description}
                        link={book.volumeInfo.infoLink}
                        page="search"
                        savedState={handleSavedState}
                    />
                })
            )
        } else {
            return (
                <div>No books found!</div>
            )
        }
    }

    return (
        <MDBContainer className="text-center">
            <MDBRow>
                <MDBCol>
                    <MDBJumbotron>
                        <h2 className="h1 display-3">Welcome to Book Saver!</h2>
                        <p className="lead">
                            Here you can search for books and save them to your read "saved" list to visit them later.
                        </p>
                        <hr className="my-2" />
                        <p>
                            Enter a book title or author to begin!
                        </p>
                        <MDBCol>
                            <MDBFormInline className="md-form mr-auto mb-4">
                                <input
                                    className="form-control mr-sm-2"
                                    type="text"
                                    placeholder="Search"
                                    aria-label="Search"
                                    value={bookSearch}
                                    onChange={handleInputSearch}
                                />
                                <MDBBtn
                                    gradient="aqua"
                                    rounded size="sm"
                                    type="success"
                                    className="mr-auto"
                                    onClick={handleSearchSubmit}
                                >
                                    Search
                                </MDBBtn>
                            </MDBFormInline>
                        </MDBCol>
                    </MDBJumbotron>
                </MDBCol>
            </MDBRow>
            {renderBookCards()}
        </MDBContainer>
    );
}

export default Homepage;