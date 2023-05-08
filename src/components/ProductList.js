import React, { Component } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import NavigationBar from "./NavigationBar";

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
      productItems: JSON.parse(localStorage.getItem("products")) || [],
    };
  }

  handleAddToCart = (id) => {
    const { cartItems, productItems } = this.state;
    const productToAdd = productItems.find((product) => product.id === id);
    if (cartItems.find((item) => item.id === id)) {
      console.log("this product already available in cart");
      return;
    }
    const newCartItems = [...cartItems, productToAdd];
    this.setState({ cartItems: newCartItems });
    localStorage.setItem("cartItems", JSON.stringify(newCartItems));
  };

  render() {
    const { cartItems, productItems } = this.state;

    return (
      <Container>
        <NavigationBar />
        <Row>
          {productItems.map((product) => (
            <Col xs={12} sm={6} md={4} lg={3} key={product.id}>
              <Card className="my-3">
                <Card.Img
                  variant="top"
                  src={
                    product.image
                      ? product.image
                      : "https://via.placeholder.com/150"
                  }
                />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>{product.description}</Card.Text>
                  <Button
                    variant="primary"
                    onClick={() => this.handleAddToCart(product.id)}
                  >
                    Add to Cart
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

export default ProductList;
