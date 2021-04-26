import React, { useState } from 'react'
import { NavLink, Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css'
import {
  Navbar, Container, Nav, Badge, NavDropdown 
} from 'react-bootstrap'
import BasketModal from './components/basketModal'
import LoginModal from './components/loginModal'
import axios from 'axios'
import { logout } from './store/reducers/client'
import config from './config'


const App = ( props ) => {
  const [ showBM, setShowBM ] = useState(false)
  const [ showLM, setShowLM ] = useState(false)

  axios.defaults.baseURL = 'http:localhost:80'
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + props.client.token

  const onLogout = () => {
    props.dispatch(logout())
  }

  return (
    <>
      <Navbar bg="light">
        <Navbar.Brand as={NavLink} to="/">Продукты</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link as={NavLink} to="/catalog">Каталог</Nav.Link>
        </Nav>
        <Nav>
          {(!props.client.token)?<Nav.Link onClick={()=>{ setShowLM(!showLM) }}>Авторизация</Nav.Link>:(
            <NavDropdown title={props.client.client.mail}>
              <NavDropdown.Item>Профиль</NavDropdown.Item>
              <NavDropdown.Item>Заказы в ожидании</NavDropdown.Item>
              <NavDropdown.Item>История заказов</NavDropdown.Item>
              <NavDropdown.Item>Избранное</NavDropdown.Item>
              <NavDropdown.Item onClick={onLogout}>Выход</NavDropdown.Item>
            </NavDropdown>
          )}
          
          <Nav.Link onClick={()=>{ setShowBM(!showBM) }}>
            Корзина
            {(props.basket.length>0)?<Badge className="ml-1" variant="success">{props.basket.length}</Badge>:''}
          </Nav.Link>
        </Nav>
      </Navbar>
      <Container className='my-4'>
        <Switch>
          {config.routers.map( ( route, i ) => (
            <Route key={i} exact path={route.path} render={(props) => ( <route.component {...props} />)}/>
          ))}
        </Switch>
      </Container>
      <BasketModal show={showBM} onHide={()=>{ setShowBM(!showBM) }}/>
      <LoginModal show={showLM} onHide={()=>{ setShowLM(!showLM) }}/>
    </>
  )
}

const mapStateToProps = ( state ) => ({
  client: state.client,
  basket: state.basket.list
})

export default connect(mapStateToProps)(App);