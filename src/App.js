import React from 'react'
import { NavLink, Switch, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import {
  Navbar, Container, Nav
} from 'react-bootstrap'
import Index from './pages/index'
import Catalog from './pages/catalog'
import Product from './pages/product'
import Basket from './pages/basket'

function App() {
  const routers = [
    { path: '/', component: Index },
    { path: '/catalog', component: Catalog },
    { path: '/product/:id', component: Product },
    { path: '/basket', component: Basket },
  ]
  return (
    <React.Fragment>
      <Navbar bg="light">
        <Navbar.Brand as={NavLink} to="/">Продукты</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link as={NavLink} to="/catalog">Home</Nav.Link>
          <Nav.Link as={NavLink} to="/basket">Link</Nav.Link>
        </Nav>
      </Navbar>
      <Container className='my-4'>
        <Switch>
          {routers.map( ( route, i ) => (
            <Route key={i} exact path={route.path} render={(props) => ( <route.component {...props} />)}/>
          ))}
        </Switch>
      </Container>
    </React.Fragment>
  );
}

export default App;
