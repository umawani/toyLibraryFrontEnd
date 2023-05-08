import React, { Component } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import NavigationBar from "./NavigationBar";

class AddProduct extends Component {
  state = {
    name: "",
    description: "",
    price: "",
    image: "",
  };

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { name, description, price, image } = this.state;

    // Retrieve existing products from local storage
    const existingProducts = JSON.parse(localStorage.getItem("products")) || [];

    // Add the new product to the list
    const newProduct = {
      id: Date.now(),
      name,
      description,
      price,
      image: "https://via.placeholder.com/150",
    };
    const updatedProducts = [...existingProducts, newProduct];

    // Store the updated list back in the local storage
    localStorage.setItem("products", JSON.stringify(updatedProducts));

    // Reset the form state
    this.setState({
      name: "",
      description: "",
      price: "",
      image: "",
    });
  };

  render() {
    const { name, description, price, image } = this.state;

    return (
      <Container>
        <Row>
          <NavigationBar />
          <Col></Col>
          <Col>
            <div className="text-center">
              <h1 className="mt-3">Add Product</h1>
            </div>
            <div className="container">
              <Row>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={name}
                      onChange={this.handleInputChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      type="text"
                      name="description"
                      value={description}
                      onChange={this.handleInputChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Image URL</Form.Label>
                    <Form.Control
                      type="text"
                      name="image"
                      value={image}
                      onChange={this.handleInputChange}
                      required
                    />
                  </Form.Group>
                  <Button className="mt-3" type="submit">
                    Add Product
                  </Button>
                </Form>
              </Row>
            </div>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    );
  }
}

export default AddProduct;
