import React from 'react'
import { NavLink, Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css'
import {
  Navbar, Container, Nav, Badge 
} from 'react-bootstrap'
import Index from './pages/index'
import Catalog from './pages/catalog'
import Product from './pages/product'
import Basket from './pages/basket'
import BasketModal from './components/basketModal'

class App extends React.Component {
  constructor(props){
    super(props)
    this.routers = [
      { path: '/', component: Index },
      { path: '/catalog', component: Catalog },
      { path: '/product/:id', component: Product },
      { path: '/basket', component: Basket },
    ]
    this.state = {
      basketModal: {
        show: false
      }
    }
  }

  showBasketModal = () =>{
    this.setState({basketModal:{show: !this.state.basketModal.show}})
  }

  render(){
    return (
      <React.Fragment>
        <Navbar bg="light">
          <Navbar.Brand as={NavLink} to="/">Продукты</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link as={NavLink} to="/catalog">Каталог</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link onClick={this.showBasketModal}>
              Корзина
              {(this.props.basket.length>0)?<Badge className="ml-1" variant="success">{this.props.basket.length}</Badge>:''}
            </Nav.Link>
          </Nav>
        </Navbar>
        <Container className='my-4'>
          <Switch>
            {this.routers.map( ( route, i ) => (
              <Route key={i} exact path={route.path} render={(props) => ( <route.component {...props} />)}/>
            ))}
          </Switch>
        </Container>
        <BasketModal show={this.state.basketModal.show} onHide={this.showBasketModal}/>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ( state ) => ({ 
  basket: state.basket.list
})

export default connect(mapStateToProps)(App);