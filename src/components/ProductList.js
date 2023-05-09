import React, { Component } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import NavigationBar from "./NavigationBar";
import {getProductList} from "../redux/actions/product_action";
import {addToCart, removeFromCart} from "../redux/actions/user_action";
import { connect } from "react-redux";

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
      productItems: JSON.parse(localStorage.getItem("products")) || [],
    };
  }

  componentDidMount(){
    this.props.getProductList();
  }

  handleAddToCart = (id) => {
    const userId = this.props.userData.id;
    this.props.addToCart(userId, id);
  };

  handleRemoveFromCart = (id) => {
    const userId = this.props.userData.id;
    this.props.removeFromCart(id, userId);
  };

  handleAddProduct = () => {
    console.log("CLICK!");
  }

  render() {
    return (
      <Container>
        <NavigationBar />
        <Row>
          {this.props.productList.map((product) => (
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
                  {this.props.userData.userType === "CUSTOMER" ? 
                      this.props.userData.cart.some(p => p.id === product.id) ? (
                        <Button
                          variant="danger"
                          onClick={() => this.handleRemoveFromCart(product.id)}
                        >
                          Remove from Cart
                        </Button>
                      )
                      :
                        (
                          <Button
                            variant="primary"
                            onClick={() => this.handleAddToCart(product.id)}
                          >
                            Add to Cart
                          </Button>
                        )
                          : ""
                      } 
                  
                </Card.Body>
              </Card>
            </Col>
          ))}
          {this.props.userData.userType === "ADMIN" ? 
            <Col xs={12} sm={6} md={4} lg={3}>
              <Card onClick={this.handleAddProduct} className="my-3">
                <Card.Img
                  variant="top"
                  src={
                    "data:image/png;base64,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"
                  }
                />
                <Card.Title>Add New Product</Card.Title>
              </Card>
            </Col>
            : ""}
        </Row>
      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getProductList: () => dispatch(getProductList()),
    addToCart: (productId, userId) => dispatch(addToCart(productId, userId)),
    removeFromCart: (productId, userId) => dispatch(removeFromCart(productId, userId)),
  };
};

const mapStateToProps = ({ productReducer, userReducer }) => ({
  productList: productReducer.productList, 
  userData: userReducer.userData,
});


export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
