import React from 'react'
import './App.css'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'

import axios from './server/axios'

import Login from './page/Login/Login'
import ToDoList from './page/Todo-List/Todo-List'
class App extends React.Component {
  state = {
    token: null,
    error: false
  }

  componentDidMount() {
    const token = localStorage.getItem('token')
    if (token !== 'null') {
      this.setState({
        token: token
      }, () => this.props.history.push('/todolist'))
    }

    const array1 = [1, 2, 3, 4, 5]
    const array2 = [2, 5, 1]
    const bonus = array1.filter(idx => array2.find(value => value === idx))
    console.log('ARRAY 1', array1)
    console.log('ARRAY 2', array2)
    console.log(bonus)
  }

  authServer = async (user) => {
    try {
      var data = null
      const res = await axios.post(`/users/auth`, user)
      console.log(res)
      if (res.status === 200) {
        data = res.data.token
      }
      return data
    } catch (error) {
      const { message } = error.response.data
      this.setState({
        error: message
      })
    }
  }

  onSubmitHandler = async (form) => {
    const user = { ...form }
    const login = {}
    for (let key in user) {
      login[key] = user[key].value
    }
    const auth = JSON.stringify(login)
    const res_Server = await this.authServer(auth)
    console.log(res_Server)
    if (res_Server) {
      this.setState({ token: res_Server },
        () => {
          localStorage.setItem('token', res_Server)
          this.props.history.push('/todolist')
        }
      )
    } else {

    }



  }

  render() {
    return (
      <Switch>
        <Route path='/' exact render={() => <Login onClicked={this.onSubmitHandler} error={this.state.error} />} />
        <Route path='/todolist' render={() => this.state.token ? <ToDoList /> : <Redirect to='/' />} />

      </Switch>

    )
  }

}

export default withRouter(App)
