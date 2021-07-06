import React, {useState} from 'react'
import { Form, Button } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks'

import {LOGIN_USER} from '../utils/GQL/mutations';
const Login = () => {
    const [loginForm, setLoginForm] = useState({username: '', password:''})
    const [loginUser, { data }] = useMutation(LOGIN_USER);

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(loginForm)
        setLoginForm({username: '', password:''})
    }
    const onChange = ({target}) => {
        setLoginForm((loginForm) => ({...loginForm, [target.name]: target.value}))
    }
    return (
        <div>
            <Form onSubmit={onSubmit} noValidate>
                <h1>Login</h1>
                <Form.Input
                    label="Username"
                    placeholder="Username"
                    type="text"
                    value={loginForm.username}
                    onChange={onChange}
                    name="username"
                />
                <Form.Input
                    label="Password"
                    placeholder="Password"
                    type="password"
                    value={loginForm.password}
                    onChange={onChange}
                    name="password"
                />
                <Button type="submit">Login</Button>
            </Form>
        </div>
    )
}

export default Login
