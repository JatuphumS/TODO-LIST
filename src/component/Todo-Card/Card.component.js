import React from 'react'
import { Button } from 'react-bootstrap'

import './Card.styles.css'

const Card = ({ title, description, index, onClicked, deleted, id }) => {
    return (
        <div className='Card' >
            <Button className='icon' onClick={() => deleted(id)}>x</Button>
            <h2 className='card-title'>{title}</h2>
            <span className='card-span'>
                <p className='card-decription'>{description}</p>
            </span>
        </div>
    )
}


export default Card