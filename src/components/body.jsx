import React from "react";
import { Form, Container, Button, Col } from "react-bootstrap";
import "../css/Evgeni.css";

class Body extends React.Component {
  state = {
    name: "default",
    description: "default",
    brand: "",
    imgUrl: "",
    price: 0,
    category: 0,
    image: null,
    cats: [],
  };
  componentDidMount = () => {
    console.log(this.props);
    this.setState({ cats: this.props.cats });
  };
  addProject = async (e) => {
    e.preventDefault();
    const project = {
      name: this.state.name,
      description: this.state.description,
      brand: this.state.brand,
      imgurl: this.state.imgurl,
      price: this.state.price,
      category: this.state.category,
    };
    console.log("actually in");
    try {
      let response = await fetch(`http://localhost:5005/product`, {
        method: "POST",
        body: JSON.stringify(project),
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      });
      const res = await response.json();
      console.log(res);
      if (res && response.ok) {
        console.log("RESPONSE=" + response);
        console.log("RES=" + res);
        if (this.state.image !== null) {
          this.attachImage(res.id);
        }
      } else {
        alert("not added");
      }

      console.log("Response: " + response);
      return response;
    } catch (e) {
      console.log("ERROR fetching HERE " + e);
    }
  };

  attachImage = async (productID) => {
    try {
      let image = new FormData();
      await image.append("productImage", this.state.image);
      console.log(image);
      await fetch("http://localhost:5005/product/" + productID + "/upload", {
        method: "POST",
        body: image,
        headers: new Headers({
          Accept: "application/json",
        }),
      });
    } catch (error) {
      console.log(error);
    }
  };

  changeStateName = async (event) => {
    this.setState({ name: event.target.value });
    console.log(this.state);
  };
  changeStateImage = async (event) => {
    this.setState({ imgurl: event.target.value });
    console.log(this.state);
  };
  changeStateDescription = async (event) => {
    this.setState({ description: event.target.value });
    console.log(this.state);
  };
  changeStateBrand = async (event) => {
    this.setState({ brand: event.target.value });
    console.log(this.state);
  };
  changeStatePrice = async (event) => {
    this.setState({ price: event.target.value });
    console.log(this.state);
  };

  render() {
    return (
      <>
        <Container>
          <div className="mainDiv mt-5">
            <Form>
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="name"
                  onChange={(event) => this.changeStateName(event)}
                  placeholder="Name"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="email"
                  onChange={(event) => this.changeStateDescription(event)}
                  placeholder="Description"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Brand</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(event) => this.changeStateBrand(event)}
                  placeholder="No nokias please"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  onChange={(event) => this.changeStatePrice(event)}
                  placeholder="$$$"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(event) => this.changeStateImage(event)}
                  placeholder="URL"
                />
              </Form.Group>
              <Form.Row>
                <Col>
                  {this.state.cats.length > 0 && (
                    <Form.Group controlId="formCategory">
                      <Form.Label>Category</Form.Label>
                      <Form.Control
                        as="select"
                        defaultValue="Choose A Category"
                        onChange={(e) =>
                          this.setState({ category: e.target.value })
                        }
                      >
                        {this.state.cats.map((category, index) => {
                          return (
                            <option key={index} value={category.id}>
                              {category.name}
                            </option>
                          );
                        })}
                      </Form.Control>
                    </Form.Group>
                  )}
                </Col>
                <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Label>Upload Image</Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      this.setState({ image: e.target.files[0] })
                    }
                    placeholder="Category"
                  />
                </Form.Group>
              </Form.Row>

              <Button variant="info" onClick={(e) => this.addProject(e)}>
                {" "}
                Add Product{" "}
              </Button>
            </Form>
          </div>
        </Container>
      </>
    );
  }
}
export default Body;
