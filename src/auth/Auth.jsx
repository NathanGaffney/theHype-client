import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import Signup from './Signup';
import Login from './Login';

const Auth = (props) => {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <Container className='auth-container'>
            <br />
            <br />
            <br />
            <br />
            <Col md='6'>
                {isLogin ? <Login updateToken={props.updateToken} /> : <Signup updateToken={props.updateToken} />}
                <br />
                {isLogin ? <h5>New User?</h5> : null}
                <Button onClick={() => setIsLogin(!isLogin)}>
                    {isLogin ? 'Sign up here' : 'Login here'}
                </Button>
            </Col>
        </Container>
    )
}

export default Auth;