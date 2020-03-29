import React,
{ useState } from 'react'
import { Button } from 'react-bootstrap'

import './Login.styles.css'

import Input from '../../component/Input/Input'

const configLogin = {
    username: {
        type: 'text',
        value: '',
        label: 'USERNAME',
        valid: {
            isRequire: true
        }
    },
    password: {
        type: 'password',
        value: '',
        label: 'PASSWORD',
        valid: {
            isRequire: true
        }
    }
}

const Login = ({ onClicked }) => {

    const [input, setInput] = useState(configLogin)
    const elementInput = []

    for (let key in input) {
        elementInput.push({
            id: key,
            ...input[key]
        })
    }

    const onChangeHandler = (event, identifier) => {

        const updateInput = { ...input }
        const updateElement = { ...input[identifier] }

        updateElement.value = event.target.value
        updateInput[identifier] = updateElement

        

        setInput(updateInput)
    }

    return (
        <div className='login'>
            <h2 className='login-header'>
                LOG IN
            </h2>
            <form>
                <div className='user-password'>
                    {elementInput.map(({ id, type, value, label, }) =>
                        <Input
                            id={id}
                            type={type}
                            value={value}
                            label={label}
                            handleChange={(event) => onChangeHandler(event, id)} />)
                    }
                </div>
            </form>
            <Button className='btn-login' onClick={() => onClicked(input)}>Login</Button>
        </div>
    )
}

export default Login