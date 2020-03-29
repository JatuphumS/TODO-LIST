import React from 'react'
import './App.css'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'

import axios from './server/axios'

import Login from './page/Login/Login'
import ToDoList from './page/Todo-List/Todo-List'
class App extends React.Component {
  state = {
    token: 1
  }

  authServer = async (user) => {
    try {
      var data = null
      const res = await axios.post(`/users/auth`, user)
      if (res.status === 200) {
        data = res.data.token
      }
      return data
    } catch (error) {

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
    if (res_Server) {
      this.setState({ token: res_Server },
        () => {
          localStorage.setItem('token', res_Server)
          this.props.history.push('/todolist')
        }
      )
    }



  }

  render() {
    console.log(this.props)
    return (
      <Switch>
        <Route path='/' exact render={() => <Login onClicked={this.onSubmitHandler} />} />
        <Route path='/todolist' exact render={() => this.state.token ? <ToDoList /> : <Redirect to='/' />} />

      </Switch>

    )
  }

}

export default withRouter(App)
