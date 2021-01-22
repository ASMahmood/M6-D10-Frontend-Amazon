import React from "react";
import {
  Form,
  Navbar,
  Nav,
  FormControl,
  Image,
  Dropdown,
  Container,
  ListGroup,
  Button,
  Card,
  Modal,
  Row,
  Col,
} from "react-bootstrap";
import "../css/Evgeni.css";
class Products extends React.Component {
  state = {
    currentProducts: [],
    isOpen: false,
    isSecondOpen: false,
    currentId: "",
    comments: [],
    rate: 1,
    comment: "",
  };
  openModal = (id) => {
    this.setState({
      isOpen: true,
      currentId: id,
    });
  };
  closeModal = () => this.setState({ isOpen: false });
  openSecondModal = () => {
    this.setState({
      isSecondOpen: true,
    });
  };
  closeSecondModal = () => this.setState({ isSecondOpen: false });
  addReview = async () => {
    const project = {
      name: this.props.userName,
      comment: this.state.comment,
      rate: this.state.rate,
    };
    const reviewId = "";

    console.log("actually in");
    try {
      let response = await fetch(`https://m6d5.herokuapp.com/reviews`, {
        method: "POST",
        body: JSON.stringify(project),
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      });
      const res = await response.json();
      console.log("review id ->", res);
      console.log("product id->", this.state.currentId);
      console.log("Response: " + res);

      //add it to the products reviews array
      let secondResponse = await fetch(
        `https://m6d5.herokuapp.com/products/${this.state.currentId}/add-review/${res}`,
        {
          method: "POST",
          body: JSON.stringify({
            productId: this.state.currentId,
            reviewId: res,
          }),
          headers: new Headers({
            "Content-Type": "application/json",
          }),
        }
      );
      console.log(secondResponse);
      return res;
    } catch (e) {
      console.log("ERROR fetching HERE " + e);
    }
  };

  deleteProduct = async (e, id) => {
    try {
      let response = await fetch(`https://m6d5.herokuapp.com/products/${id}`, {
        method: "DELETE",
      });
      console.log(response);
      if (response.ok) {
        console.log(response);
      } else {
        alert("The respose is not ok but still removed");
      }

      console.log("Response: " + response);
      this.fetchProducts();
      return response;
    } catch (e) {
      console.log("ERROR fetching HERE " + e);
    }
  };
  changeStateComment = async (event) => {
    this.setState({ comment: event.target.value });
    console.log(this.state);
  };
  changeStateRate = async (event) => {
    this.setState({ rate: event.target.value });
    console.log(this.state);
  };

  getTheReviews = async (id) => {
    this.openSecondModal();
    try {
      let response = await fetch(`https://m6d5.herokuapp.com/products/${id}`, {
        method: "GET",
      });
      response = await response.json();
      this.setState({ comments: response.reviews });
      console.log(response.reviews);
      return response;

      //console.log("user", response)
    } catch (e) {
      console.log("ERROR fetching HERE " + e);
    }
  };

  fetchProducts = async () => {
    try {
      let response = await fetch(`hhttps://m6d5.herokuapp.com/products`);
      response = await response.json();

      console.log(response);
      this.setState({ currentProducts: response });
      return response;

      //console.log("user", response)
    } catch (e) {
      console.log("ERROR fetching HERE " + e);
    }
  };
  componentDidMount = async () => {
    this.fetchProducts();
  };
  render() {
    return (
      <>
        <Modal show={this.state.isSecondOpen}>
          <Modal.Header>
            <Modal.Title>Reviews</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.state.comments.map((comment) => (
              <p>
                {" "}
                <img
                  className="commentSectionPic"
                  src="https://i.stack.imgur.com/l60Hf.png"
                />{" "}
                {comment.name} : {comment.comment} {comment.rate}/5{" "}
              </p>
            ))}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.closeSecondModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={this.state.isOpen}>
          <Modal.Header>
            <Modal.Title>Add A Review</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Rate</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(event) => this.changeStateRate(event)}
                  placeholder="Dont be rude pls"
                />
              </Form.Group>

              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Comment</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(event) => this.changeStateComment(event)}
                  placeholder="Dont be rude pls"
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => this.addReview()}>
              Submit Comment
            </Button>
            <Button variant="secondary" onClick={this.closeModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        <Row className="justify-content-center">
          {this.state.currentProducts.length !== 0 &&
            this.state.currentProducts.map((project) => (
              <Col xs={3} className="mt-5">
                <Card style={{ width: "18rem" }} value={project._id}>
                  <Card.Img
                    variant="top"
                    src={project.imgUrl}
                    style={{ height: "300px", objectFit: "cover" }}
                  />
                  <Card.Body>
                    <div className="d-none">{project.id}</div>
                    <Card.Title>{project.name}</Card.Title>
                    <Card.Text>{project.description}</Card.Text>
                    <Card.Text>Brand / {project.brand}</Card.Text>
                    <Button variant="success">Buy Now {project.price}</Button>
                    <Button
                      variant="secondary"
                      onClick={(e) => this.openModal(project._id)}
                    >
                      Add a review
                    </Button>
                    <Button
                      variant="info"
                      onClick={(e) => this.getTheReviews(project._id)}
                    >
                      See Reviews
                    </Button>
                    <Button
                      variant="danger"
                      onClick={(e) => this.deleteProduct(e, project._id)}
                    >
                      Delete Product{" "}
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
        </Row>
      </>
    );
  }
}
export default Products;
