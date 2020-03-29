import React from 'react'
import { Form } from 'react-bootstrap'

import './Input.styles.css'

const Input = ({ type, getValid, label, value, handleChange, id }) => {
    return (
        <Form.Group className='form-group'>
            <Form.Label className='label'>{label}</Form.Label>
            <Form.Control
                className={`form-control ${getValid ? 'trueValid' : 'falseValid'}`}
                isInvalid={!getValid}
                value={value}
                type={type}
                placeholder={label}
                onChange={handleChange}
            />
        </Form.Group>
    )
}

export default Input