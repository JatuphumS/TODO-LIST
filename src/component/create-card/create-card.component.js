import React from 'react'
import { Button } from 'react-bootstrap'

import Input from '../Input/Input'
import './create.card.styles.css'

import Aux from '../../hoc/hoc'
import BackDrop from '../backdrop/backdrop'

const createCard = ({ config, handleChange, cancel, create, newCard, edited }) => {
    const elementInput = []

    for (let key in config) {
        elementInput.push({
            id: key,
            ...config[key]
        })
    }

    return (
        <Aux>
            <BackDrop show />
            <div className='create-card'>
                <div className='list-card'>
                    {elementInput.map(({ id, type, value, label, }) =>
                        <Input
                            id={id}
                            type={type}
                            value={value}
                            label={label}
                            handleChange={(event) => handleChange(event, id)} />)
                    }
                </div>
                <div className='buttonGroup'>
                    <Button className='btn cancel' onClick={cancel}>Cancel</Button>
                    <Button className='btn create'
                        onClick={create}>{newCard ? 'CREATE' : 'EDIT'}</Button>

                </div>
            </div>
        </Aux>


    )
}
export default createCard