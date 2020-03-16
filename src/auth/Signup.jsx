import React, {useState} from 'react';
import {Form, FormGroup, Label, Input, Button} from 'reactstrap';
import APIURL from '../helpers/environment';

const Signup = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    let handleSubmit = (event) => {
        event.preventDefault();
        if (username && password) {
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
        } else {
            alert('Please Fill Out All Fields')
        }
    }

    return (
        <div>
            <h1>Sign Up</h1>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label htmlFor='username'>Username</Label>
                    <Input onChange={(e) => setUsername(e.target.value)} name='username' value={username} />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor='password'>Password</Label>
                    <Input onChange={(e) => setPassword(e.target.value)} type='password' name='password' value={password} />
                </FormGroup>
                <Button type='submit'>Signup</Button>
            </Form>
        </div>
    )
}


export default Signup;