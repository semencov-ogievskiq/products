import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import axios from 'axios'
import {
    Table, Button, Spinner, Form
} from 'react-bootstrap'
import { removeBasket, increaseQuantity, lesseningQuantity, removeBasketAll } from '../store/reducers/basket'

class Basket extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            list: {},
            totalPrice: 0,
            form: {
                method: '1',
                address: '',
                comment: '',
                pic_point: '',
                fio: '',
                payment_type: '1',
                phone: ''
            }
        }
    }

    componentDidMount = async () => {
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

    submit = async ( ev ) => {
        ev.preventDefault()
        let data = {
            ...this.state.form,
            products: this.props.basket
        }
        try{
            await axios('http://localhost:80/orders',{method:'post',data:data})
            this.props.dispatch(removeBasketAll())
            this.props.history.replace('/')
        }catch( err ){
            console.log( err )
        }
    }

    changeMethod = ( ev ) => {
        this.setState({form: { ...this.state.form, method: ev.target.value, address: '', comment: '', pic_point: (ev.target.value==='2')?'1':''}})
    }
  
    render(){
        return (
            <>
                <h1>Корзина</h1>
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
                                        <td><Link to={ '/product/' + data.id }>{data.name}</Link></td>
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
                <h5 className="w-100">Итог: {parseFloat(this.getTotalPrice()).toFixed(2)} $</h5>
                {(this.props.basket.length>0)?(
                    <Form onSubmit={this.submit}>
                        <Form.Group controlId="method">
                            <Form.Label>Способ доставки</Form.Label>
                            <Form.Control as="select" name="method" value={this.state.form.method} onChange={this.changeMethod}>
                                <option value="1">Курьер</option>
                                <option value="2">Самовывоз</option>
                            </Form.Control>
                        </Form.Group>
                        {(this.state.form.method==='1')?(<>
                            <Form.Group controlId="address">
                                <Form.Label>Адрес доставки</Form.Label>
                                <Form.Control type="text" name="address" value={this.state.form.address} onChange={(e)=>{ this.setState({form: { ...this.state.form, address: e.target.value }}) }}/>
                            </Form.Group>
                            <Form.Group controlId="comment">
                                <Form.Label>Комментарий к доставке</Form.Label>
                                <Form.Control as="textarea" name="comment" value={this.state.form.comment} onChange={(e)=>{ this.setState({form: { ...this.state.form, comment: e.target.value }}) }}/>
                            </Form.Group>
                        </>):null}
                        {(this.state.form.method==='2')?(<>
                            <Form.Group controlId="pic_point">
                                <Form.Label>Пункт выдачи</Form.Label>
                                <Form.Control as="select" name="pic_point" value={this.state.form.pic_point} onChange={(e)=>{ this.setState({form: { ...this.state.form, pic_point: e.target.value }}) }}>
                                    <option value="1">Савеловский</option>
                                    <option value="2">Белоруский</option>
                                </Form.Control>
                            </Form.Group>
                        </>):null}
                        <Form.Group controlId="fio">
                            <Form.Label>ФИО заказчика</Form.Label>
                            <Form.Control type="text" name="fio" value={this.state.form.fio} onChange={(e)=>{ this.setState({form: { ...this.state.form, fio: e.target.value }}) }}/>
                        </Form.Group>
                        <Form.Group controlId="phone">
                            <Form.Label>Телефон</Form.Label>
                            <Form.Control type="text" name="phone" value={this.state.form.phone} onChange={(e)=>{ this.setState({form: { ...this.state.form, phone: e.target.value }}) }}/>
                        </Form.Group>
                        <Form.Group controlId="payment_type">
                            <Form.Label>Способ оплаты</Form.Label>
                            <Form.Control as="select" name="payment_type" value={this.state.form.payment_type} onChange={(e)=>{ this.setState({form: { ...this.state.form, payment_type: e.target.value }}) }}>
                                <option value="1">Картой</option>
                                <option value="2">Наличными</option>
                            </Form.Control>
                        </Form.Group>
                        <Button type="submit" className="float-right my-3" variant="primary">Заказать</Button>
                    </Form>
                ):null}
            </>
        )
    }
}

const mapStateToProps = ( state ) => ({ 
    basket: state.basket.list
})

export default connect(mapStateToProps)(Basket);