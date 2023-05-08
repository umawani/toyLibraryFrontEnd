import React, { Component } from "react";
import { Navbar, Nav, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";

class NavigationBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItemsCount: this.props.userData ? this.props.userData.cart ? this.props.userData.cart.length : 0 : 0,
    };
  }

  onCartClick = () => {
    this.setState({
      cartNavigate: true,
    })
  }

  onProductClick = () => {
    this.setState({
      productNav : true
    })
  }

  componentDidMount() {
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.props.userData !== prevProps.userData){
      this.setState({
        cartItemsCount: this.props.userData ? this.props.userData.cart ? this.props.userData.cart.length : 0 : 0,
      })
    }
  }

  render() {
    const cartNavigate = this.state.cartNavigate;
    const productNav = this.state.productNav;
    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#">Toy Library</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link key="home" href="#">
              Home
            </Nav.Link>
            <Nav.Link key="product" onClick={this.onProductClick}>
              Products
            </Nav.Link>
          </Nav>
          <Nav>
            <Button key="cart" variant="primary" onClick={this.onCartClick}>
              Cart ({this.state.cartItemsCount})
            </Button>
          </Nav>
        </Navbar.Collapse>
        {cartNavigate && <Navigate to="/cart" replace="true" />}
        {productNav && <Navigate to="/product-list" replace="true" />}
      </Navbar>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

const mapStateToProps = ({ userReducer }) => ({
  userData: userReducer.userData,
});

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);
