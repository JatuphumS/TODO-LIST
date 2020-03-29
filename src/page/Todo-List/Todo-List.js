import React, {
    useState,
    useEffect
} from 'react'
import { Button } from 'react-bootstrap'

import axios from 'axios'

import './Todo-List.styles.css'

import Card from '../../component/Todo-Card/Card.component'
import CreateCard from '../../component/create-card/create-card.component'
import ModalDelete from '../../component/recheckDelete/recheck.component'


const config_card = {
    title: {
        type: 'text',
        value: '',
        label: 'Title',
        valid: {
            isRequire: true
        }
    },
    description: {
        type: 'text',
        value: '',
        label: 'Description',
        valid: {
            isRequire: true
        }
    }
}

const getTodoList = async () => {
    const option = {
        url: 'https://candidate.neversitup.com/todo/todos',
        method: 'get',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    }
    const res = await axios(option)
    return res.data
}

const postTodoList = async (todo) => {

    const option = {
        url: 'https://candidate.neversitup.com/todo/todos',
        method: 'post',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': `application/json`
        },
        data: todo
    }
    const res = await axios(option)
    return res.status
}
const deleteCard = async (id) => {
    const option = {
        url: `https://candidate.neversitup.com/todo/todos/${id}`,
        method: 'delete',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
    }
    const res = await axios(option)
    console.log(res)
}
const ToDoList = () => {
    const [todoTitle, setTodoTitle] = useState([])
    const [configCard, setConfigCard] = useState(config_card)
    const [showCreate, setShowCrate] = useState(false)
    const [newCard, setNewCard] = useState(false)
    const [index, setIndex] = useState(null)
    const [showModalDelete, setShowModalDelete] = useState(false)
    const [cardDelete, setCardDelete] = useState(null)
    const [connect, setConnect] = useState(false)



    useEffect(async () => {
        console.log('connect')

        const res_todo = await getTodoList()
        setTodoTitle(res_todo)

    }, [])
    


    const onCreateChnageHandler = (event, identifier) => {
        const updateConfig = { ...configCard }
        const updateElement = { ...configCard[identifier] }

        updateElement.value = event.target.value
        updateConfig[identifier] = updateElement

        setConfigCard(updateConfig)
    }

    const createCardHandler = async () => {
        const card = { ...configCard }
        const fomrCard = {}
        for (let key in card) {
            fomrCard[key] = card[key].value
        }
        const body = JSON.stringify(fomrCard)
        const res_post = await postTodoList(body)

        const res_todo = await getTodoList()
        setTodoTitle(res_todo)
        setShowCrate(false)
        
    }

    const editCardHadler = (card, index) => {
        const updateCard = { ...configCard }

        for (let key in updateCard) {
            updateCard[key].value = card[key]
        }
        console.log(config_card)

        setConfigCard(updateCard)
        setShowCrate(true)
        setNewCard(false)
    }
    const showCreatCardHandler = () => {
        setConfigCard(config_card)
        setShowCrate(true)
        setNewCard(true)

    }
    const closeCreatCardHandler = () => {
        setShowCrate(false)
    }


    const showModalDeleteHandler = (id) => {
        setShowModalDelete(true)
        setCardDelete(id)
    }
    const closeModalDeleteHandler = () => {
        setShowModalDelete(false)
    }
    const confirmDeleteCardHandler = async () => {
        const id_Card = cardDelete
        const res = await deleteCard(id_Card)
        console.log(res)
        setShowModalDelete(false)
    }


    return (
        <div className='Todo-List'>
            {<div className="todo-cardList">
                {
                    todoTitle.length > 0 ?

                        todoTitle.map(({ title, description, _id }, index) => <Card
                            onClicked={editCardHadler}
                            index={index}
                            title={title}
                            id={_id}
                            deleted={showModalDeleteHandler}
                            description={description} />)
                        : <p>Empty press 'CREATE' for add new todo</p>
                }
            </div>}
            {
                showCreate ? <CreateCard
                    newCard={newCard}
                    cancel={closeCreatCardHandler}
                    create={createCardHandler}
                    config={configCard}
                    handleChange={onCreateChnageHandler} /> : null
            }
            {showModalDelete ? <ModalDelete
                confirm={confirmDeleteCardHandler}
                cancel={closeModalDeleteHandler} /> : null}
            <Button className='btn-create' onClick={showCreatCardHandler}>Create</Button>
        </div>
    )
}

export default ToDoList