import React, {useState} from 'react';
import {Form, FormGroup, Label, Input, Button} from 'reactstrap';
import APIURL from '../helpers/environment';

const Signup = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    let handleSubmit = (event) => {
        event.preventDefault();
        if (username.length >= 5 && password.length >= 5) {
            fetch(`${APIURL}/user/signup`, {
                method: 'Post',
                body: JSON.stringify({ username: username, password: password}),
                headers: new Headers({
                    'Content-Type' : 'application/json'
                })
            }).then(
                (response) => response.json()
            ).then((data) => {
                props.updateToken(data.sessionToken)
            })
        } else if (username.length < 5 && password.length < 5) {
            alert('Username and Password Must Be At Least 5 Characters')
        } else {
            alert('Please Fill Out All Fields')
        }
        
    }

    return (
        <div className='login-signup'>
            <h1>Sign Up</h1>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label htmlFor='username'></Label>
                    <Input placeholder='Username (Must be at least 5 characters)' onChange={(e) => setUsername(e.target.value)} name='username' value={username} />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor='password'></Label>
                    <Input placeholder='Password (Must be at least 5 characters)' onChange={(e) => setPassword(e.target.value)} type='password' name='password' value={password} />
                </FormGroup>
                <Button color='info' type='submit'>Signup</Button>
            </Form>
        </div>
    )
}


export default Signup;