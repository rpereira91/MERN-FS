import React, {useState} from 'react'
import { Form, Button } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks'

const Register = () => {
    const [loginForm, setLoginForm] = useState({username: '', password:'', email: '', confirmPassword: '',})
    // const [loginUser, { data }] = useMutation(LOGIN_USER);

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(loginForm)
        setLoginForm({username: '', password:'', email:''})
    }
    const onChange = ({target}) => {
        setLoginForm((loginForm) => ({...loginForm, [target.name]: target.value}))
    }
    return (
        <div>
            <Form onSubmit={onSubmit} noValidate>
                <h1>Register</h1>
                <Form.Input
                    label="Username"
                    placeholder="Username"
                    type="text"
                    value={loginForm.username}
                    onChange={onChange}
                    name="username"
                />
                <Form.Input
                    label="Email"
                    placeholder="something@mail.here"
                    type="text"
                    value={loginForm.email}
                    onChange={onChange}
                    name="email"
                />
                <Form.Input
                    label="Password"
                    placeholder="Password"
                    type="password"
                    value={loginForm.password}
                    onChange={onChange}
                    name="password"
                />
                <Form.Input
                    label="Confirm Password"
                    placeholder="Password"
                    type="password"
                    value={loginForm.confirmPassword}
                    onChange={onChange}
                    name="confirmPassword"
                />
                <Button type="submit">Login</Button>
            </Form>
        </div>
    )
}

export default Register
