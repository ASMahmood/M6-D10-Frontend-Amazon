import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Body from "./components/body";
import Products from "./components/products";
import Navbar from "./components/NavBar";
import { BrowserRouter as Router, Route } from "react-router-dom";

class App extends React.Component {
  state = {
    name: "guest",
    categories: [],
  };
  changeUsername = async (username) => {
    this.setState({ name: username });
  };

  componentDidMount = () => {
    this.fetchCategories();
  };

  fetchCategories = async () => {
    try {
      let response = await fetch("http://localhost:5005/category");
      let res = await response.json();
      console.log(res);
      this.setState({ categories: res });
    } catch (error) {
      console.log(error);
    }
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
                <Products
                  {...props}
                  userName={this.state.name}
                  cats={this.state.categories}
                />
              )}
            />
            {this.state.categories.length > 0 && (
              <Route
                path="/products"
                exact
                render={(props) => (
                  <Body {...props} cats={this.state.categories} />
                )}
              />
            )}

            <div class="row copyright">
              <div class="col-md-12 text-center">
                <p>
                  <small class="block">
                    &copy; 2021 | All Rights Reserved.
                  </small>
                  <small class="block">Powered by EvgeniAndAbdul.com</small>
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
