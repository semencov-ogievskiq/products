import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {
    Card, Container, Row, Col, Button
} from 'react-bootstrap'
import { addBasket, removeBasket } from '../store/reducers/basket'

class Catalog extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            catalog: []
        }
        
    }

    componentDidMount() {
        this.getCatalog()
    }

    getCatalog = async () => {
        try{
            let res = await axios.get('http://localhost:80/catalog')
            this.setState({catalog:res.data})
        }catch( err ){
            console.log( err )
        }
    }



    render(){
        return (
            <Row>
                <Col xs={{span:6,order:12}}>1</Col>
                <Col xs={{span:6,order:1}}>
                    <Container fluid>
                        <Row>
                            {this.state.catalog.map((el)=>(
                                <Col key={el.id}>
                                    <Card>
                                        <Card.Body>
                                            <Card.Title>
                                                <Link to={ '/product/' + el.id }>{el.name}</Link>
                                            </Card.Title>
                                            <Card.Text>{el.description}</Card.Text>
                                            <Card.Text className="text-right h4">{el.price}$</Card.Text>
                                            {(this.props.basket.findIndex((e)=>( e.id === el.id )) === -1)?(
                                                <Button className="float-right" variant="success" onClick={()=>{this.props.dispatch(addBasket(el.id))}}>В корзину</Button>
                                            ):(
                                                <Button className="float-right" variant="light" onClick={()=>{this.props.dispatch(removeBasket(el.id))}}>Убрать</Button>
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
}

const mapStateToProps = ( state ) => ({ 
    basket: state.basket.list
})

export default connect(mapStateToProps)(Catalog);