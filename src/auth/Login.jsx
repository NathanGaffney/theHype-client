import React, {useState} from 'react';
import { Form, FormGroup, Label, Input, Button} from 'reactstrap';
import APIURL from '../helpers/environment';

const Login = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        if (username && password) {
        fetch(`${APIURL}/user/login`, {
            method: 'POST',
            body: JSON.stringify({ username: username, password: password }),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(
            (response) => response.json()
        ).then((data) => {
           data.sessionToken ? props.updateToken(data.sessionToken)
           : alert(`${data.error}: Username or Password Not Found`)
        })
    } else { alert('Please Fill Out All Fields')}
    }

    return (
        <div className='login-signup'>
            <h1>Login</h1>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label htmlFor='username'></Label>
                    <Input placeholder='Username' onChange={(e) => setUsername(e.target.value)} name='username' value={username} />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor='password'></Label>
                    <Input placeholder='Password' onChange={(e) => setPassword(e.target.value)} type='password' name='password' value={password} />
                </FormGroup>
                <Button color='info' type='submit'>Login</Button>
                
            </Form>
        </div>
    )
}

export default Login;