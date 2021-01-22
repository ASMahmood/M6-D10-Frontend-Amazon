import logo from "./logo.svg";
import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Body from "./components/body";
import Products from "./components/products";
import Navbar from "./components/NavBar";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import {
  Row,
  Col,
  Form,
  Nav,
  FormControl,
  Image,
  Dropdown,
  Container,
  ListGroup,
  Button,
} from "react-bootstrap";

class App extends React.Component {
  state = {
    name: "guest",
  };
  changeUsername = async (username) => {
    this.setState({ name: username });
  };

  render() {
    return (
      <>
        <>
          <Router>
            <Navbar
              changeUsername={this.changeUsername}
              userName={this.state.name}
            />
            <Route
              path="/"
              exact
              render={(props) => (
                <Products {...props} userName={this.state.name} />
              )}
            />
            <Route path="/products" component={Body} />

			<div class="row copyright">
				<div class="col-md-12 text-center">
					<p>
						<small class="block">&copy; 2021 | All Rights Reserved.</small> 
						<small class="block">Powered by  EvgeniAndAbdul.com</small>
					</p>
				</div>
			</div>

          </Router>
          
        </>
      </>
    );
  }
}

export default App;
