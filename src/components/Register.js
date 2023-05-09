import React, { Component } from "react";
import "../App.css";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import {
  register,
  completeRegistration
} from "../redux/actions/user_action";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      name: "",
      navigate: false,
    };
  }

  componentDidUpdate(){
    if(this.props.registered){
      this.props.completeRegistration();
      this.setState({
        navigate:true
      })
    }
  }

  handleEmailChange = (event) => {
    this.setState({ email: event.target.value });
  };

  handleNameChange = (event) => {
    this.setState({ name: event.target.value });
  };

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const formdata = {
      name: this.state.name,
      email : this.state.email,
      password : this.state.password,
    }
    this.props.register(formdata);
    console.log(`Email: ${this.state.email} Password: ${this.state.password}`);
  };

  render() {
    const { email, password, name } = this.state;
    const navigate = this.state.navigate
    return (
      <>
      <Container>
        <Row>
          <Col></Col>
          <Col>
            <div className="text-center">
              <h1 className="mt-3">Toy Library</h1>
            </div>
            <div className="container">
              <h1 className="text-center my-5">Register</h1>
              <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="formBasicName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={name}
                    onChange={this.handleNameChange}
                    placeholder="Enter Name"
                  />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                  <Form.Label className="mt-1">Email address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={email}
                    onChange={this.handleEmailChange}
                    placeholder="Enter email"
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label className="mt-1">Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={password}
                    onChange={this.handlePasswordChange}
                    placeholder="Password"
                  />
                </Form.Group>

                <Button className="mt-3" variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </div>
          </Col>
          <Col></Col>
        </Row>
      </Container>
      {navigate && <Navigate to="/" replace="true"/>}
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    register : (formdata) => dispatch(register(formdata)),
    completeRegistration : () => dispatch(completeRegistration()),
  };
};

const mapStateToProps = ({ userReducer }) => ({
  registered: userReducer.registered,
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
