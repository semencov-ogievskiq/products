import React from 'react'
import { NavLink, Switch, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import {
  Navbar
} from 'react-bootstrap'
import Index from './pages/index'

function App() {
  const routers = [
    { path: '/', component: Index }
  ]
  return (
    <React.Fragment>
      <Navbar bg="light">
        <Navbar.Brand as={NavLink} to="/">Продукты</Navbar.Brand>
      </Navbar>
      <Switch>
        {routers.map( ( route, i ) => (
          <Route path={route.path} render={route.component}/>
        ))}
      </Switch>
    </React.Fragment>
  );
}

export default App;
