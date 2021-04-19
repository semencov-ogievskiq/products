import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import axios from 'axios'
import {
    Modal, Table, Button, Spinner
} from 'react-bootstrap'
import { removeBasket, increaseQuantity, lesseningQuantity } from '../store/reducers/basket'


class BasketModal extends React.Component{
    constructor( props ){
        super(props)
        this.state = {
            list: {},
            totalPrice: 0
        }
    }

    onShow = async () => {
        this.setState( { list: {}, totalPrice: 0 } )
        for( let product of this.props.basket ){
            try{
                let {data} = await axios.get('http://localhost:80/catalog/' + product.id)
                let list = this.state.list
                list[data.id] = data
                this.setState({ list: {...list} })
            }catch( err ){
                console.log( err )
                this.props.dispatch(removeBasket(product.id))
            }
        }
    }

    getTotalPrice = () => {
        let totalPrice = 0
        for( let product of this.props.basket ){
            let data = this.state.list[product.id]
            try{
                totalPrice += data.price * product.quantity
            }catch{}
        }
        return totalPrice
    }

    render(){
        return (
            <Modal size="lg" show={this.props.show} onHide={this.props.onHide} onShow={this.onShow} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Корзина
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table hover>
                        <thead>
                            <tr>
                                <th>Название</th>
                                <th>Цена</th>
                                <th>Количество</th>
                            </tr>
                        </thead>
                        <thead>
                            {(this.props.basket.length>0)? this.props.basket.map( product => {
                                let data = this.state.list[product.id]
                                return(
                                    <React.Fragment key={ product.id }>
                                    {( data )?(
                                        <tr>
                                            <td>{data.name}</td>
                                            <td>{data.price} $</td>
                                            <td className="text-right pr-2">
                                                <Button variant="light" onClick={()=>this.props.dispatch(lesseningQuantity(product.id))}>-</Button>
                                                <span className="mx-2">{product.quantity}</span>
                                                <Button variant="light" onClick={()=>this.props.dispatch(increaseQuantity(product.id))}>+</Button>
                                            </td>
                                        </tr>   
                                    ):
                                    (<tr>
                                        <th className="text-center" colSpan="3">
                                            <Spinner animation="border" />
                                        </th>
                                    </tr>)
                                    }
                                    </React.Fragment>
                                )
                            })
                            :
                                <tr>
                                    <th className="text-center" colSpan="3">В корзине нет товаров</th>
                                </tr>
                            }
                        </thead>
                    </Table>
                </Modal.Body>
                <Modal.Footer>
                    <h5 className="w-100">Итог: {parseFloat(this.getTotalPrice()).toFixed(2)} $</h5>
                    <Button as={Link} variant="success" to="/basket" onClick={this.props.onHide}>Подробнее</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

const mapStateToProps = ( state ) => ({ 
    basket: state.basket.list
})

export default connect(mapStateToProps)(BasketModal);