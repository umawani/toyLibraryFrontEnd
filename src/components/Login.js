import React, { Component } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import { login } from "../redux/actions/user_action";
import { connect } from "react-redux";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      navigate: false,
    };
  }

  componentDidMount() {
    this.fetchUser();
  }

  fetchUser() {
    this.props.login();
  }

  handleEmailChange = (event) => {
    this.setState({ email: event.target.value });
  };

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      navigate: true,
    });
    console.log(`Email: ${this.state.email} Password: ${this.state.password}`);
  };

  navigateToRegister = () => {
    this.setState({
      navigate: true,
    });
  };

  render() {
    const { email, password, navigate } = this.state;
    return (
      <Container>
        <Row>
          <Col></Col>
          <Col>
            <div className="text-center">
              <h1 className="mt-3">Toy Library</h1>
            </div>
            <div className="container">
              <h1 className="text-center my-5">Sign In</h1>
              <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
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
                <Row>
                  <Col>
                    <Button className="mt-3" variant="primary" type="submit">
                      Submit
                    </Button>
                  </Col>
                  <Col></Col>
                  <Col></Col>
                  <Col>
                    <Button
                      className="mt-3"
                      variant="primary"
                      onClick={this.navigateToRegister}
                    >
                      Register
                    </Button>
                  </Col>
                </Row>
              </Form>
            </div>
          </Col>
          <Col></Col>
        </Row>
        {navigate && <Navigate to="/product-list" replace="true" />}
        {/* {navigate && <Navigate to="/register" replace="true" />} */}
      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: () => dispatch(login()),
  };
};

const mapStateToProps = ({ userReducer }) => ({
  userData: userReducer.userData,
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
