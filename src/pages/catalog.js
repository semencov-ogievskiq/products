import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {
    Card, Container, Row, Col, Button
} from 'react-bootstrap'
import { getCatalog } from '../store/reducers/catalog'
import { addBasket, removeBasket } from '../store/reducers/basket'


function Catalog( props ){
    // Инициализация пустого каталога
    if( props.catalog.length === 0 && !props.loadingCatalog ){
        props.dispatch(getCatalog())
    }    

  
    return (
        <Row>
            <Col xs={{span:6,order:12}}>1</Col>
            <Col xs={{span:6,order:1}}>
                <Container fluid>
                    <Row>
                        {props.catalog.map((el)=>(
                            <Col key={el.id_product}>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>
                                            <Link to={ '/product/' + el.id_product }>{el.name}</Link>
                                        </Card.Title>
                                        <Card.Text>{el.description}</Card.Text>
                                        <Card.Text className="text-right h4">{el.price}$</Card.Text>
                                        {(props.basket.indexOf(el.id_product)===-1)?(
                                            <Button className="float-right" variant="success" onClick={()=>{props.dispatch(addBasket(el.id_product))}}>В корзину</Button>
                                        ):(
                                            <Button className="float-right" variant="light" onClick={()=>{props.dispatch(removeBasket(el.id_product))}}>Убрать</Button>
                                        )}
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </Col>
        </Row>
    )

}

const mapStateToProps = ( state ) => ({ 
    catalog: state.catalog.list,
    loadingCatalog: state.catalog.loading,
    basket: state.basket.list
})

export default connect(mapStateToProps)(Catalog);