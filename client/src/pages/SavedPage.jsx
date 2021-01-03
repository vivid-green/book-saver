import React, {useEffect, useState} from 'react';
import { MDBContainer } from "mdbreact";
import Card from '../components/Card';

const SavedPage = () => {

    const [books, setBooks] = useState([]);

    const handleDeletedState = (bookId) => {
        setBooks(books.filter(book => book._id !== bookId));
    }
    
    useEffect(() => {
        if (books) console.log(books);
        const requestOptions = {
            method: 'GET',
        };
        fetch('/api/books', requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log("data",data);
                setBooks(data);
            })
            .catch(err => console.log(err));
    }, [])


    const renderBookCards = () => {
        console.log("state", books);
        if (books) {
            return (
                books.map(({ _id, authors, desc, img, link, title }) => {
                    return <Card
                        key={_id}
                        bookId={_id}
                        title={title}
                        img={img}
                        authors={authors}
                        desc={desc}
                        link={link}
                        deletedState={handleDeletedState}
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
            {renderBookCards()}
        </MDBContainer>
    );
}

export default SavedPage;