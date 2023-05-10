import React, { Component } from "react";
import { Container, Row, Col, Card, Button, Alert } from "react-bootstrap";
import NavigationBar from "./NavigationBar";
import { connect } from "react-redux";
import { removeFromCart, userCheckout, completeCheckout } from "../redux/actions/user_action";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItems: this.props.userData ? this.props.userData.cart ? this.props.userData.cart : [] : [],
    };
  }

  componentDidUpdate(prevProps, prevState){
    if(this.props.userData !== prevProps.userData){
      this.setState({
        cartItems: this.props.userData ? this.props.userData.cart ? this.props.userData.cart : [] : [],
      })
    }
    if(this.props.checkedOut){
      this.props.completeCheckout();
      this.setState({
        cartItems: []
      });
    }
  }

  handleCheckOut = () => {
    this.props.userCheckout(this.props.userData.id);
  }



  handleRemoveFromCart = (id) => {
    const userId = this.props.userData.id;
    this.props.removeFromCart(userId, id);
  }

  render() {
    const { cartItems } = this.state;

    return (
      <Container>
        <NavigationBar />
        <Row>
        <Col xs={12} sm={12} md={12} lg={12}><h2>Cart Items</h2>
        {cartItems.length > 0 ? <Button className="rounded-circle" onClick={this.handleCheckOut}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart-check-fill" viewBox="0 0 16 16">
  <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-1.646-7.646-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L8 8.293l2.646-2.647a.5.5 0 0 1 .708.708z"/>
</svg>
              </Button> : ""}
              
              </Col>
          

          {cartItems.length === 0 && (
            <Alert key="secondary" variant="secondary">
              Your cart is empty.
            </Alert>
          )}

          {cartItems.map((item) => (
            <Col xs={12} sm={6} md={4} lg={3} key={item.id}>
              <Card className="my-3">
                <Card.Img
                  variant="top"
                  src={
                    item.image ? `data:image/jpeg;base64,${item.image}` : "https://via.placeholder.com/150"
                  }
                />
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text>{item.description}</Card.Text>
                  <Button
                    variant="danger"
                    onClick={() => this.handleRemoveFromCart(item.id)}
                  >
                    Remove from Cart
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
          {cartItems.length > 0 ? 
            <Col xs={12} sm={6} md={4} lg={3}>
              
            </Col>
         : ""}
        </Row>
      </Container>
    );
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    removeFromCart: (userId, productId) => dispatch(removeFromCart(userId, productId)),
    userCheckout: (userId) => dispatch(userCheckout(userId)),
    completeCheckout: () => dispatch(completeCheckout()),
  };
};

const mapStateToProps = ({ userReducer }) => ({
  userData: userReducer.userData,
  checkedOut: userReducer.checkedOut,
});


export default connect(mapStateToProps, mapDispatchToProps)(Cart);
