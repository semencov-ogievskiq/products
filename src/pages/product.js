import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import {
    Spinner, Alert, Button, Row, Col, Image, Nav, Table
} from 'react-bootstrap'
import { addBasket, removeBasket, increaseQuantity, lesseningQuantity } from '../store/reducers/basket'

class Product extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            errGetData: false,
            data: null,
            tabs: '1'
        }
        this.id = this.props.match.params.id
    }

    async componentDidMount(){
        try{
            let { data } = await axios.get('http://localhost:80/catalog/' + this.id)
            this.setState({data: data})
        }catch( err ){
            console.log(err)
            this.setState({errGetData:false})
        }
    }

    render(){
        return (
            <>
                {(this.state.errGetData)?(
                    <Alert variant="danger">
                        <h2>Ошибка!</h2>
                        <p className="mr-4">Товар не найден</p>
                        <div className="text-right">
                            <Button className="mr-4" onClick={()=>{window.history.back()}} variant="primary" href="#">Назад</Button>
                        </div>
                    </Alert>
                ):(!this.state.data)?(
                    <div className="text-center">
                        <Spinner animation="border" variant="primary"/>
                    </div>
                ):(
                    <>
                        <Row>
                            <Col className="text-center" xs="12" md="6" lg="4" xl="2">
                                <Image src="/logo512.png" height="150" width="150" rounded/>
                            </Col>
                            <Col className="" xs="12" md="6" lg="8" xl="10">
                                <h1>{this.state.data.name}</h1>
                                <div>
                                    {(this.props.basket.findIndex((e)=>( e.id === this.id )) !== -1)?(
                                        <span className="mr-2">
                                            <strong className="mr-2">В корзине:</strong>
                                            <Button variant="light" onClick={()=>this.props.dispatch(lesseningQuantity(this.id))}>-</Button>
                                            <span className="mx-2">{this.props.basket[this.props.basket.findIndex((el)=>(el.id===this.id))].quantity}</span>
                                            <Button variant="light" onClick={()=>this.props.dispatch(increaseQuantity(this.id))}>+</Button>
                                        </span>
                                    ):null}
                                    {(this.props.basket.findIndex((e)=>( e.id === this.id )) === -1)?(
                                        <Button className="float-right" variant="success" onClick={()=>{this.props.dispatch(addBasket(this.id))}}>В корзину</Button>
                                    ):(
                                        <Button className="float-right" variant="light" onClick={()=>{this.props.dispatch(removeBasket(this.id))}}>Убрать</Button>
                                    )}
                                </div>
                            </Col>
                        </Row>
                        <Row className="mt-4">
                            <Col xs="12">
                                <Nav justify variant="tabs" onSelect={(e)=>{this.setState({tabs:e})}} defaultActiveKey={this.state.tabs}>
                                    <Nav.Item>
                                        <Nav.Link eventKey="1">Описание</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="2">Характеристики</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Col>
                            {(this.state.tabs === '1')?(
                                <Col xs="12">
                                    <p className="m-4">{(this.state.data.description)?this.state.data.description:'Описание отсутствует'}</p>
                                </Col>
                            ):null}
                            {(this.state.tabs === '2')?(
                                <Col xs="12">
                                    {(!this.state.data.characteristic)?<p className="m-4">Характеристика отсутствует</p>: (
                                        <Table className="m-4" hover>
                                            <tbody>
                                                {Object.keys(this.state.data.characteristic).map((item,key)=>(
                                                    <tr key={item}>
                                                        <th>{item}</th>
                                                        <td>{this.state.data.characteristic[item]}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </Table>
                                    )}
                                    
                                </Col>
                            ):null}
                        </Row>
                    </>
                )}
            </>
        )
    }
}

const mapStateToProps = ( state ) => ({ 
    basket: state.basket.list
})

export default connect(mapStateToProps)(Product)