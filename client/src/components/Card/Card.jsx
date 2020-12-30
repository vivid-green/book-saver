import React from 'react';
import { MDBRow, MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol, MDBIcon } from 'mdbreact';

const Card = (props) => {

  const handleSave = (e) => {
    e.preventDefault();
    console.log(props.bookId);
    // console.log(e.target.getAttribute('data-id'));
    props.savedState(props.bookId);
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(props)
    };
    console.log(requestOptions);
    fetch('/api/books', requestOptions)
      .then(response => response.json())
      .then(data => {
        // console.log(props);
        console.log(data);
      })
      .catch(err => console.log(err));
  };

  const handleDelete = (e) => {
    e.preventDefault();
    // console.log(props.bookId);
    props.deletedState(props.bookId);
    const requestOptions = {
      method: 'DELETE',
    };
    console.log(requestOptions);
    fetch(`/api/books/${props.bookId}`, requestOptions)
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(err => console.log(err));
  };

  return (
    <MDBRow>
      <MDBCol size="12">
        <MDBCard className="m-2 mw-100">
          <MDBCol className="d-flex justify-content-center">
            <MDBCardImage className="img-fluid" src={props.img} waves />
          </MDBCol>
          <MDBCardBody>
            <MDBCardTitle style={{ color: "black" }}>{props.title}</MDBCardTitle>
            <p>Authored by: {props.authors}</p>
            <MDBCardText className="cardbody">
              {props.desc}
            </MDBCardText>
            <MDBBtn
              gradient="juicy-peach"
              style={{ color: "black" }}
              href={props.link}
              target="_blank"
              rel="noreferrer"
            ><MDBIcon icon="book-open" size="3x" /><br></br>View</MDBBtn>
            {
              props.page === "search" ?
                <MDBBtn
                  gradient="juicy-peach"
                  style={{ color: "black" }}
                  onClick={handleSave}
                ><MDBIcon icon="globe-americas" size="3x" /><br></br>Save</MDBBtn>
              :
                <MDBBtn
                  gradient="juicy-peach"
                  style={{ color: "black" }}
                  onClick={handleDelete}
                ><MDBIcon far icon="trash-alt" size="3x" /><br></br>Delete</MDBBtn>
            }
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    </MDBRow>
  )
}

export default Card;