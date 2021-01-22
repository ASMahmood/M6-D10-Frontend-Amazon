import React from "react";
import {
  Form,
  Container,
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
    currentId: 0,
    comments: [],
    rate: 1,
    comment: "",
    category: "",
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
      comment: this.state.comment,
      rate: this.state.rate,
      productId: this.state.currentId,
    };

    console.log("actually in");
    try {
      await fetch(`http://localhost:5005/review`, {
        method: "POST",
        body: JSON.stringify(project),
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      });

      this.closeModal();
    } catch (e) {
      console.log("ERROR fetching HERE " + e);
    }
  };

  deleteProduct = async (e, id) => {
    try {
      let response = await fetch(`http://localhost:5005/product/${id}`, {
        method: "DELETE",
      });
      console.log(response);
      if (response.ok) {
        console.log(response);
      } else {
        alert("The respose is not ok but still removed");
      }

      console.log("Response: " + response);
      this.fetchProps();
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
      let response = await fetch(
        `http://localhost:5005/product/${id}/reviews`,
        {
          method: "GET",
        }
      );
      response = await response.json();
      this.setState({ comments: response.reviews });
      console.log(response.reviews);
      return response;

      //console.log("user", response)
    } catch (e) {
      console.log("ERROR fetching HERE " + e);
    }
  };

  fetchCategory = async () => {
    try {
      let response = await fetch(
        `http://localhost:5005/category/` + this.props.filter
      );
      let res = await response.json();

      console.log(response);
      console.log(res);
      this.props.filter !== 0
        ? this.setState({
            currentProducts: res.products,
            category: res.name,
          })
        : this.setState({ currentProducts: res });

      return res;

      //console.log("user", response)
    } catch (e) {
      console.log("ERROR fetching HERE " + e);
    }
  };
  componentDidMount = async () => {
    this.fetchCategory();
  };
  componentDidUpdate = (prevProps) => {
    if (prevProps.filter !== this.props.filter) {
      this.fetchCategory();
    }
  };

  fetchProducts = async () => {
    try {
      let response = await fetch(`http://localhost:5005/product/`);
      response = await response.json();

      console.log("help", response);
      this.setState({ currentProducts: response });
      return response;

      //console.log("user", response)
    } catch (e) {
      console.log("ERROR fetching HERE " + e);
    }
  };

  render() {
    return (
      <>
        <Modal show={this.state.isSecondOpen}>
          <Modal.Header>
            <Modal.Title>Reviews</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.state.comments.length > 0 ? (
              this.state.comments.map((comment) => (
                <p>
                  {" "}
                  <img
                    className="commentSectionPic"
                    src="https://i.stack.imgur.com/l60Hf.png"
                  />{" "}
                  {comment.name} : {comment.comment} {comment.rate}/5{" "}
                </p>
              ))
            ) : (
              <p>There are no comments :(</p>
            )}
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
              <Form.Row>
                <Col>
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Comment</Form.Label>
                    <Form.Control
                      as="textarea"
                      onChange={(event) => this.changeStateComment(event)}
                      placeholder="Dont be rude pls"
                    />
                  </Form.Group>
                </Col>

                <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Label>Rate</Form.Label>
                  <Form.Control
                    type="number"
                    defaultValue={3}
                    min={0}
                    max={5}
                    onChange={(event) => this.changeStateRate(event)}
                    placeholder="Dont be rude pls"
                  />
                </Form.Group>
              </Form.Row>
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
        <Container>
          <Row className="justify-content-center">
            {this.state.currentProducts &&
              this.state.currentProducts.length > 0 &&
              this.state.currentProducts.map((project, index) => (
                <Col xs={3} className="mt-5" key={index}>
                  {console.log(project)}
                  <Card value={project.id}>
                    <Card.Img
                      variant="top"
                      src={project.imgurl}
                      style={{ height: "300px", objectFit: "cover" }}
                    />
                    <Card.Body>
                      <div className="d-none position-relative">
                        {project.id}
                      </div>
                      <Card.Title>
                        {project.name}:{" "}
                        <small>
                          {" "}
                          in{" "}
                          {this.props.filter > 0
                            ? this.state.category
                            : project.category.name}
                        </small>
                      </Card.Title>
                      <div className="productInfoBox">
                        <Card.Text>{project.description}</Card.Text>
                        <Card.Text>Brand / {project.brand}</Card.Text>
                        <Button variant="success">
                          Buy Now {project.price}
                        </Button>
                        <Button
                          variant="secondary"
                          onClick={(e) => this.openModal(project.id)}
                        >
                          Add a review
                        </Button>
                        <Button
                          variant="info"
                          onClick={(e) => this.getTheReviews(project.id)}
                        >
                          See Reviews
                        </Button>
                        <Button
                          variant="danger"
                          onClick={(e) => this.deleteProduct(e, project.id)}
                        >
                          Delete Product{" "}
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
          </Row>
        </Container>
      </>
    );
  }
}
export default Products;
