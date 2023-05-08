import React, { Component } from "react";
import { Navbar, Nav, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

class NavigationBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItemsCount: 0,
    };
  }

  componentDidMount() {
    const cartItems = JSON.parse(localStorage.getItem("cartItems"));
    if (cartItems) {
      this.setState({ cartItemsCount: cartItems.length });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const cartItems = JSON.parse(localStorage.getItem("cartItems"));
    if (prevState.cartItemsCount !== cartItems.length) {
      this.setState({ cartItemsCount: cartItems.length });
    }
  }

  render() {
    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#">Toy Library</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link key="home" href="#">
              Home
            </Nav.Link>
            <Nav.Link key="product" href="/product-list">
              Products
            </Nav.Link>
          </Nav>
          <Nav>
            <Button key="cart" variant="primary" as={Link} to="/cart">
              Cart ({this.state.cartItemsCount})
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default NavigationBar;
