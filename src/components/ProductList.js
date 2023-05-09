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
                  {
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
                  }
                  
                </Card.Body>
              </Card>
            </Col>
          ))}
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
