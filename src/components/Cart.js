import React, { Component } from "react";
import { Container, Row, Col, Card, Button, Alert } from "react-bootstrap";
import NavigationBar from "./NavigationBar";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
    };
  }

  handleRemoveFromCart = (id) => {
    const { cartItems } = this.state;
    const newCartItems = cartItems.filter((item) => item.id !== id);
    this.setState({ cartItems: newCartItems });
    localStorage.setItem("cartItems", JSON.stringify(newCartItems));
  };

  render() {
    const { cartItems } = this.state;

    return (
      <Container>
        <NavigationBar />
        <Row>
          <h2>Cart Items</h2>

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
                    item.image ? item.image : "https://via.placeholder.com/150"
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
        </Row>
      </Container>
    );
  }
}

export default Cart;
