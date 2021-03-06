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
                <h2 style={{
                    borderBottom: `2.5px dashed #E1DCD9`
                }}>{newCard ? 'Create new Card' : 'Edit Card'}</h2>
                <div className='list-card'>
                    {elementInput.map(({ id, type, value, label,valid }) =>
                        <Input
                            id={id}
                            type={type}
                            value={value}
                            label={label}
                            getValid={true}
                            handleChange={(event) => handleChange(event, id)} />)
                    }
                </div>
                <div className='buttonGroup'>
                    <Button className='btn cancel' onClick={cancel}>Cancel</Button>
                    <Button className='btn create'
                        onClick={newCard ? create : edited}>{newCard ? 'CREATE' : 'EDIT'}</Button>

                </div>
            </div>
        </Aux>


    )
}
export default createCard