import React, { Component } from "react";

import { Navbar, Col, Dropdown, Nav } from "react-bootstrap";
import logo from "./image/AmazonLogoNav.png";
import "../css/Abdul.css";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { BiCart } from "react-icons/bi";
import { BsList } from "react-icons/bs";

import { Link } from "react-router-dom";
import "../css/navbar.css";
class navbar extends Component {
  render() {
    return (
      <div className=" my-auto align-items-center">
        <Navbar
          className=" py-auto align-items-center"
          style={{ height: "65px", backgroundColor: "#131921" }}
        >
          <Navbar.Brand href="/">
            <img
              src={logo}
              onClick={() => this.props.location.push("/")}
              style={{ height: "30px", width: "100px" }}
            />
          </Navbar.Brand>

          <Nav.Link>
            <button
              style={{
                height: "45px",
                minWidth: "120px",
                background: "#131921",
                color: "white",
                fontSize: "12px",
              }}
            >
              <div className="d-flex justify-content-center align-items-end">
                <HiOutlineLocationMarker size={20} />
                <p>
                  Deliver to {this.props.userName}
                  <br />
                  <strong>Albania</strong>
                </p>
              </div>
            </button>
          </Nav.Link>
          <Col>
            <input
              type="text"
              placeholder="Search.."
              style={{ height: "45px", width: "100%", minWidth: "200px" }}
            />
          </Col>
          <Nav.Link>
            <Link to="/products">
              <button
                style={{
                  height: "45px",
                  width: "120px",
                  background: "#131921",
                  color: "white",
                  fontSize: "14px",
                }}
              >
                <div>
                  <p>
                    Hello, {this.props.userName}
                    <br />
                    <strong>Account & list</strong>
                  </p>
                </div>
              </button>
            </Link>
          </Nav.Link>
          <Nav.Link>
            <button
              style={{
                height: "45px",
                width: "80px",
                background: "#131921",
                color: "white",
                fontSize: "14px",
              }}
            >
              <div>
                <p>
                  Returns
                  <br />
                  <strong>& Orders</strong>
                </p>
              </div>
            </button>
          </Nav.Link>

          <Nav.Link>
            <button
              style={{
                height: "45px",
                width: "120px",
                background: "#131921",
                color: "white",
                fontSize: "14px",
              }}
            >
              <div className="d-flex align-items-end">
                <BiCart size={40} />
                <p>
                  <strong>Basket</strong>
                </p>
              </div>
            </button>
          </Nav.Link>

          <Dropdown className="ml-auto">
            <Dropdown.Toggle className="dropdownContainer">
              <img
                className="profilePicDrop"
                src="https://i.stack.imgur.com/l60Hf.png"
              />
            </Dropdown.Toggle>

            <Dropdown.Menu align="right">
              <Dropdown.Item onClick={() => this.props.changeUsername("Abdul")}>
                Abdul
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => this.props.changeUsername("Evegni")}
              >
                Evgeni{" "}
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Navbar>
        <Navbar id="categoryNav">
          <Nav.Link onClick={() => this.props.changeFilter(0)}>
            <BsList size={25} /> All
          </Nav.Link>
          {this.props.cats.length > 0 &&
            this.props.cats.map((category) => {
              return (
                <Nav.Link onClick={() => this.props.changeFilter(category.id)}>
                  {category.name}
                </Nav.Link>
              );
            })}
        </Navbar>
      </div>
    );
  }
}
export default navbar;
