import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import Signup from './Signup';
import Login from './Login';
import './Auth.css';
import Controller from '../assets/ps4controller.jpg'

const Auth = (props) => {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className='wrapper'>
        <div className='login-banner'>
            <div className='auth-container'>
            <br />
                <Row>
                    <Col sm='6'>
                        {isLogin ? <Login updateToken={props.updateToken} /> : <Signup updateToken={props.updateToken} />}
                        <br />
                        {/* {isLogin ? <h5>New User?</h5> : <h5>Existing User?</h5>} */}
                        <Button color='info' onClick={() => setIsLogin(!isLogin)}>
                            {isLogin ? 'Sign up here' : 'Login here'}
                        </Button>
                    </Col>
                    {/* <Col sm='6'>
                        <div className='auth-pic-guide'>
                        <img className='login-pic' style={{height: 280, width: 500}} src={Controller} />
                        </div>
                    </Col> */}
                </Row>
                    <h1 className='welcome'>The Hype-Train</h1>
            </div>
        </div>
        </div>
    )
}

export default Auth;