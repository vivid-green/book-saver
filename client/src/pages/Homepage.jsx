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

                    return <Card
                        key={book.id}
                        bookId={book.id}
                        title={book.volumeInfo.title}
                        img={book.volumeInfo.imageLinks.thumbnail}
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
                        <h2 className="h1 display-3">Hello, world!</h2>
                        <p className="lead">
                            This is a simple hero unit, a simple Jumbotron-style component for
                            calling extra attention to featured content or information.
                        </p>
                        <hr className="my-2" />
                        <p>
                            It uses utility classes for typgraphy and spacing to space content out
                            within the larger container.
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