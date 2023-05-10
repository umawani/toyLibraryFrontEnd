import React, { Component } from "react";
import { Container, Row, Col, Card, Button, Modal,Form } from "react-bootstrap";
import NavigationBar from "./NavigationBar";
import {getProductList, addProduct, completeCreateProduct, editProduct} from "../redux/actions/product_action";
import {addToCart, removeFromCart} from "../redux/actions/user_action";
import { connect } from "react-redux";
import ProductHistory from "./ProductHistory";

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
      productItems: JSON.parse(localStorage.getItem("products")) || [],
      showModal: false,
      productName: "",
      imageFile: null,
      imageUrl: null,
      mode: "",
      productId: null,
    };
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
  }

  componentDidMount(){
    this.props.getProductList();
  }

  componentDidUpdate(){
    if(this.props.created){
      this.props.getProductList();
      this.props.completeCreateProduct();
    }
  }

  handleAddToCart = (id) => {
    const userId = this.props.userData.id;
    this.props.addToCart(userId, id);
  };

  handleRemoveFromCart = (id) => {
    const userId = this.props.userData.id;
    this.props.removeFromCart(id, userId);
  };

  handleShow() {
    this.setState({ showModal: true, mode: "ADD" });
  }

  handleClose() {
    this.setState({ 
      showModal: false, 
      productName: "",
      imageFile: "",
      imageUrl: "",
      mode: "",
      productId: null,
    });
  }

  handleShowHistory = (id) => {
    this.setState({
      historyId : id,
      showHistory : true,
    })
  }

  handleHistoryClose = () => {
    this.setState({
      historyId: null,
      showHistory : false,
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const formdata = {
      name : this.state.productName,
      file : this.state.imageFile,
    }
    if(this.state.mode === "ADD"){
      this.props.addProduct(formdata);
    }
    else{
      formdata["id"] = this.state.productId;
      this.props.editProduct(formdata);
    }
    this.handleClose();
  };

  handleChange = (event) => {
    this.setState({ productName: event.target.value });
  };

  handleImageChange(event) {
    event.preventDefault();
    let reader = new FileReader();
    let imageFile = event.target.files[0];
    reader.onloadend = () => {
      this.setState({
        imageFile: imageFile,
        imageUrl: reader.result
      });
    };
    reader.readAsDataURL(imageFile);
  }

  handleProductEdit = (productId, name, image) => {
    this.setState({
      showModal : true,
      mode: "EDIT",
      productName: name,
      productId: productId,
    })
  }

  render() {
    return (
      <Container>
        <NavigationBar />
        <Row>
          {this.props.productList.map((product) => (
            console.log(product.image),
            <Col xs={12} sm={6} md={4} lg={3} key={product.id}>
              <Card className="my-3">
                <Card.Img
                  variant="top"
                  src={
                    product.image
                      ? `data:image/jpeg;base64,${product.image}`
                      : "https://via.placeholder.com/150"
                  }
                />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>{product.description}</Card.Text>
                  {this.props.userData.userType === "CUSTOMER" ? 
                      product.bookedUntil ? 
                        "Product Booked Until " + product.bookedUntil:
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
                          : 
                          <>
                            <Button
                              variant="primary"
                              onClick={() => this.handleShowHistory(product.id)}
                            >
                              Show Booking History
                            </Button>
                            <Button className="rounded-circle" onClick={() => this.handleProductEdit(product.id, product.name, product.image)} variant="light">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
</svg>
              </Button>
                          </>

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
                  onClick={this.handleShow}
                />
                <Card.Title>Add New Product</Card.Title>
              </Card>
            </Col>
           : ""} 
        </Row>

        <Modal show={this.state.showModal} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{this.state.mode === "ADD" ? "Add" : "Edit"}  Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId="productName">
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter product name"
                  name="productName"
                  value={this.state.productName}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Label>Image</Form.Label>
          <Form.Control
            type="file"
            onChange={this.handleImageChange}
            accept="image/*"
          />
            </Form>
            
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={this.handleSubmit}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={this.state.showHistory} onHide={this.handleHistoryClose}>
              <ProductHistory id={this.state.historyId} />
        </Modal>
        
      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getProductList: () => dispatch(getProductList()),
    addToCart: (productId, userId) => dispatch(addToCart(productId, userId)),
    removeFromCart: (productId, userId) => dispatch(removeFromCart(productId, userId)),
    addProduct: (formdata) => dispatch(addProduct(formdata)),
    completeCreateProduct: () => dispatch(completeCreateProduct()),
    editProduct: (formdata) => dispatch(editProduct(formdata)),
  };
};

const mapStateToProps = ({ productReducer, userReducer }) => ({
  productList: productReducer.productList, 
  userData: userReducer.userData,
  created: productReducer.created,
});


export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
