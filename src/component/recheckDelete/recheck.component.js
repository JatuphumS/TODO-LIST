import React from 'react'
import { Button } from 'react-bootstrap'

import './recheck.styles.css'

import Aux from '../../hoc/hoc'
import BackDrop from '../backdrop/backdrop'

const recheck = ({cancel,confirm ,title}) => (
    <Aux>
        <BackDrop show />
        <div className='recheck'>
            <h1>Want Delete  {title} ?</h1>
            <div className='recheck-groupbutton'>
                <Button className='btn cancel' onClick={cancel}>CANCEL</Button>
                <Button className='btn create' onClick={confirm}>CONFIRM</Button>
            </div>
        </div>
    </Aux>

)

export default recheck