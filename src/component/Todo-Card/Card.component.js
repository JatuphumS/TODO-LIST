import React from 'react'
import { Button } from 'react-bootstrap'

import './Card.styles.css'

const Card = ({ title, description, index, onClicked, deleted, id }) => {
    return (
        <div className='Card' >
            <div className='card-details' onClick={() => onClicked({title,description},index,id)}>
                <h2 className='card-title'>{title ? title:'Untitle'}</h2>
                    <p className='card-decription'>{description}</p>
            </div>
            <Button className='icon' onClick={() => deleted(id,title)}>
            <i className="material-icons">delete_forever</i>
            </Button>
        </div>
    )
}


export default Card