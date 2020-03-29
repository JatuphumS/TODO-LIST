import React,
{ useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'

import './Login.styles.css'

import Input from '../../component/Input/Input'

const configLogin = {
    username: {
        type: 'text',
        value: '',
        label: 'USERNAME',
        valid: false,
        validation: {
            isRequire: true

        }
    },
    password: {
        type: 'password',
        value: '',
        label: 'PASSWORD',
        valid: false,
        validation: {
            isRequire: true,
            isPassword: 8
        }
    }
}

const Login = ({ onClicked, error }) => {

    const [input, setInput] = useState(configLogin)
    const [validBtn, setValidBtn] = useState(false)
    const elementInput = []


    for (let key in input) {
        elementInput.push({
            id: key,
            ...input[key]
        })
    }


    const validation = (value, rules) => {
        let isValid = true;
        if (!rules) {
            return true
        }
        if (rules.isRequire) {
            isValid = value.trim() !== '' && isValid
        }
        if (rules.isPassword) {
            var strongRegex = new RegExp("^(?=.{8,})");
            isValid = strongRegex.test(value) && isValid
        }
        return isValid
    }

    const onChangeHandler = (event, identifier) => {

        const updateInput = { ...input }
        const updateElement = { ...input[identifier] }

        updateElement.value = event.target.value
        updateElement.valid = validation(updateElement.value, updateElement.validation)
        let valid = true
        updateInput[identifier] = updateElement
        for (let key in updateInput) {
            valid = updateInput[key].valid && valid
        }
        setValidBtn(valid)
        setInput(updateInput)
    }

    return (
        <div className='login'>
            <h2 className='login-header'>
                LOG IN
            </h2>

            <form>
                <div className='user-password'>
                    <div className='form-login'>
                        {elementInput.map(({ id, type, value, label, valid }) =>
                            <Input
                                id={id}
                                type={type}
                                value={value}
                                label={label}
                                getValid={valid}
                                handleChange={(event) => onChangeHandler(event, id)} />)
                        }
                    </div>
                </div>
            </form>
            {
                error ? <p style={{
                    color: '#ff0000',
                    fontSize: '15px'
                }}>{error}</p> : null
            }
            <Button
                disabled={!validBtn}
                style={{
                    cursor:validBtn ? 'pointer' : 'not-allowed'
                }}
                className='btn-login' onClick={() => onClicked(input)}>Login</Button>
        </div>
    )
}

export default Login