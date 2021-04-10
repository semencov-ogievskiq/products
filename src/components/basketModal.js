import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {
    Modal, Table, Button
} from 'react-bootstrap'

class BasketModal extends React.Component{
    constructor( props ){
        super(props)
        this.state = {
            list: []
        }
    }

    componentDidMount(){
        console.log(this.props.basket)
        for( let product of this.props.basket ){
            let list = this.state.list
            list.push({
                tt: product,
                name: 'dss',
                price: 2312
            })
            console.log('hh')
            this.setState({ list: list })
        }
    }

    render(){
        console.log(this.state.list)
        return (
            <Modal size="lg" show={this.props.show} onHide={this.props.onHide} animation={false} >
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
                            {(this.state.list.length>0)? this.state.list.map( product => (
                                <tr>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td></td>
                                </tr>
                            ))
                            :
                                <tr>
                                    <th className="text-center" colSpan="3">В корзине нет товаров</th>
                                </tr>
                            }
                        </thead>
                    </Table>
                </Modal.Body>
                <Modal.Footer>
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