import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {
    Card, Container, Row, Col, Button, Form
} from 'react-bootstrap'
import { addBasket, removeBasket } from '../store/reducers/basket'

const Catalog = props => {
    const [ list, setList ] = useState([])
    const [ filterForm, setFilterForm ] = useState({
        type: '',
        name: '',
        priceFrom: '',
        priceTo: ''
    })
    const [ filter, setFilter ] = useState({})

    useEffect(()=>{
        const source = axios.CancelToken.source()
        axios.get('http://localhost:80/catalog', { cancelToken: source.token, params: filter })
            .then((res)=>{
                setList(res.data)
            })
            .catch((err)=>{ console.log(err) })
        return ()=>{ source.cancel('Размантирован') }
    },[filter])

    const submit = ev => {
        ev.preventDefault()
        setFilter(filterForm)
    }

    return (
        <Row>
            <Col md={{span:4,order:12}} lg={{span:3,order:12}} xl={{span:3,order:12}}>
                <Form onSubmit={submit}>
                    <Form.Group className="text-center" controlId="type">
                        <Form.Label>Тип продукта</Form.Label>
                        <Form.Control as="select" value={filterForm.type} onChange={ ev => setFilterForm({...filterForm, type: ev.target.value }) }>
                            <option></option>
                            <option value="1">Смартфоны</option>
                            <option value="2">Планшеты</option>
                            <option value="3">Ноутбуки</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group className="text-center" controlId="name">
                        <Form.Label>Название</Form.Label>
                        <Form.Control type="text" value={filterForm.name} onChange={ ev => setFilterForm({...filterForm, name: ev.target.value }) }/>
                    </Form.Group>
                    <Form.Group className="text-center" controlId="priceFrom">
                        <Form.Label>Цена от</Form.Label>
                        <Form.Control type="number" value={filterForm.priceFrom} onChange={ ev => setFilterForm({...filterForm, priceFrom: ev.target.value }) }/>
                    </Form.Group>
                    <Form.Group className="text-center" controlId="priceTo">
                        <Form.Label>Цена до</Form.Label>
                        <Form.Control type="number" value={filterForm.priceTo} onChange={ ev => setFilterForm({...filterForm, priceTo: ev.target.value }) }/>
                    </Form.Group>
                    <Button type="submit" variant="primary">Применить</Button>
                </Form>
            </Col>
            <Col md={{span:8,order:1}} lg={{span:9,order:1}} xl={{span:9,order:1}}>
                <Container fluid>
                    <Row>
                        {list.map((el)=>(
                            <Col key={el.id}>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>
                                            <Link to={ '/product/' + el.id }>{el.name}</Link>
                                        </Card.Title>
                                        <Card.Text>{el.description}</Card.Text>
                                        <Card.Text className="text-right h4">{el.price}$</Card.Text>
                                        {(props.basket.findIndex((e)=>( e.id === el.id )) === -1)?(
                                            <Button className="float-right" variant="success" onClick={()=>{props.dispatch(addBasket(el.id))}}>В корзину</Button>
                                        ):(
                                            <Button className="float-right" variant="light" onClick={()=>{props.dispatch(removeBasket(el.id))}}>Убрать</Button>
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
    basket: state.basket.list
})

export default connect(mapStateToProps)(Catalog);