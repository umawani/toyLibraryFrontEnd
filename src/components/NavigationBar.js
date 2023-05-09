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

  onLogoutClick = () => {
    this.setState({
      logoutNavigate: true,
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
    const logoutNavigate = this.state.logoutNavigate;
    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#">Toy Library</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link key="product" onClick={this.onProductClick}>
              Products
            </Nav.Link>
          </Nav>
          {
            this.props.userData.userType === "ADMIN" ? "" : 
          <Nav>
            <Button key="cart" variant="primary" onClick={this.onCartClick}>
              Cart ({this.state.cartItemsCount})
            </Button>
          </Nav>
          }
          <Nav className="ms-auto">
            <Button key="logout" variant="danger" onClick={this.onLogoutClick}>
              Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
        {cartNavigate && <Navigate to="/cart" replace="true" />}
        {productNav && <Navigate to="/product-list" replace="true" />}
        {logoutNavigate && <Navigate to="/" replace="true" />}
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
