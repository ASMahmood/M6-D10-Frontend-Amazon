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
  Col,
} from "react-bootstrap";
import "../css/Evgeni.css";

//-projectID - name - text - date;
/*
"_id": "5d318e1a8541744830bef139", //SERVER GENERATED
        "name": "app test 1",  //REQUIRED
        "description": "somthing longer", //REQUIRED
        "brand": "nokia", //REQUIRED
        "imageUrl": "https://drop.ndtv.com/TECH/product_database/images/2152017124957PM_635_nokia_3310.jpeg?downsize=*:420&output-quality=80",
        "price": 100, //REQUIRED
        "category": "smartphones"
        */
class Body extends React.Component {
  state = {
    name: "default",
    description: "default",
    brand: "",
    imgUrl: "",
    price: 0,
    category: "",
    image: null,
  };
  addProject = async () => {
    const project = {
      name: this.state.name,
      description: this.state.description,
      brand: this.state.brand,
      imgUrl: this.state.imgUrl,
      price: this.state.price,
      category: this.state.category,
    };
    console.log("actually in");
    try {
      let response = await fetch(`https://m6d5.herokuapp.com/products`, {
        method: "POST",
        body: JSON.stringify(project),
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      });
      const res = await response.json();
      if (response.ok) {
        console.log("RESPONSE=" + response);
        console.log("RES=" + res);
        if (this.state.image !== null) {
          this.attachImage(res);
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
      await fetch(
        "https://m6d5.herokuapp.com/products/" + productID + "/upload",
        {
          method: "POST",
          body: image,
          headers: new Headers({
            Accept: "application/json",
          }),
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  changeStateName = async (event) => {
    this.setState({ name: event.target.value });
    console.log(this.state);
  };
  changeStateImage = async (event) => {
    this.setState({ imgUrl: event.target.value });
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
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="name"
                  onChange={(event) => this.changeStateName(event)}
                  placeholder="Name"
                />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="email"
                  onChange={(event) => this.changeStateDescription(event)}
                  placeholder="Description"
                />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Brand</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(event) => this.changeStateBrand(event)}
                  placeholder="No nokias please"
                />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  onChange={(event) => this.changeStatePrice(event)}
                  placeholder="$$$"
                />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(event) => this.changeStateImage(event)}
                  placeholder="URL"
                />
              </Form.Group>
              <Form.Row>
                <Col>
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label htmlFor="category">Category</Form.Label>
                    <Form.Control
                      type="text"
                      name="category"
                      value={this.state.category}
                      onChange={(e) =>
                        this.setState({ category: e.currentTarget.value })
                      }
                      placeholder="Category"
                    />
                  </Form.Group>
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

              <Button variant="info" onClick={() => this.addProject()}>
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
