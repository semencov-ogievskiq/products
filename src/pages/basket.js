import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import axios from 'axios'
import {
    Table, Button, Spinner, Form
} from 'react-bootstrap'
import { removeBasket, increaseQuantity, lesseningQuantity } from '../store/reducers/basket'

const TableBasket = props => {
    const [ list, setList ] = useState({})

    useEffect( ()=>{
        let cancel = false
        const getList = async () => {
            var listTmp = {}  
            for( let product of props.basket ){
                if ( cancel ) break;
                try{                
                    let { data } = await axios.get('http://localhost:80/catalog/' + product.id)
                    listTmp[data.id] = data
                }catch( err ){
                    console.log( err )
                    props.dispatch(removeBasket(product.id))
                }
            }
            if(!cancel) setList(listTmp)
        }
        getList()
        return ()=> { cancel = true}
    }, [props]) 

    const totalAmount = () => {
        let total = 0
        for( var product of props.basket){
            let data = list[product.id]
            if( data ){
                total += data.price * product.quantity
            }
        }
        return parseFloat(total).toFixed(2)
    }
    return <>
        <Table hover>
            <thead>
                <tr>
                    <th>Название</th>
                    <th>Цена</th>
                    <th>Количество</th>
                </tr>
            </thead>
            <thead>
                {(props.basket.length>0)? props.basket.map( product => {
                    let data = list[product.id]
                    return(
                        <React.Fragment key={ product.id }>
                        {( data )?(
                            <tr>
                                <td><Link to={ '/product/' + data.id }>{data.name}</Link></td>
                                <td>{data.price} $</td>
                                <td className="text-right pr-2">
                                    <Button variant="light" onClick={()=>props.dispatch(lesseningQuantity(product.id))}>-</Button>
                                    <span className="mx-2">{product.quantity}</span>
                                    <Button variant="light" onClick={()=>props.dispatch(increaseQuantity(product.id))}>+</Button>
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
                <tr>
                    <th colSpan="3">Итог: {totalAmount()} $</th>
                </tr>
            </thead>
        </Table>
    </>
}

const Basket = props => {
    const [ form, setForm ] = useState({
        method: '',
        address: '',
        comment: '',
        pic_point: '',
        fio: '',
        payment_type: '',
        phone: ''
    })

    const submitForm = ev => {
        ev.preventDefault()
    }

    const onChangeMethod = ev => {
        setForm({ ...form, method: ev.target.value, address: '', comment: '', pic_point: ''})
    }

    return (
        <>
            <h1>Корзина</h1>
            <TableBasket basket={props.basket} dispatch={props.dispatch}/>
            {(props.basket.length>0)?(
                <Form onSubmit={submitForm}>
                    <Form.Group controlId="method">
                        <Form.Label>Способ доставки</Form.Label>
                        <Form.Control as="select" name="method" value={form.method} required onChange={onChangeMethod}>
                            <option></option>
                            <option value="1">Курьер</option>
                            <option value="2">Самовывоз</option>
                        </Form.Control>
                    </Form.Group>
                    {(form.method==='1')?(<>
                        <Form.Group controlId="address">
                            <Form.Label>Адрес доставки</Form.Label>
                            <Form.Control type="text" name="address" value={form.address} onChange={(e)=>{ setForm({...form, address: e.target.value }) }}/>
                        </Form.Group>
                        <Form.Group controlId="comment">
                            <Form.Label>Комментарий к доставке</Form.Label>
                            <Form.Control as="textarea" name="comment" value={form.comment} onChange={(e)=>{ setForm({ ...form, comment: e.target.value }) }}/>
                        </Form.Group>
                    </>):null}
                    {(form.method==='2')?(<>
                        <Form.Group controlId="pic_point">
                            <Form.Label>Пункт выдачи</Form.Label>
                            <Form.Control as="select" name="pic_point" value={form.pic_point} onChange={(e)=>{ setForm({ ...form, pic_point: e.target.value }) }}>
                                <option></option>
                                <option value="1">Савеловский</option>
                                <option value="2">Белоруский</option>
                            </Form.Control>
                        </Form.Group>
                    </>):null}
                    <Form.Group controlId="fio">
                        <Form.Label>ФИО заказчика</Form.Label>
                        <Form.Control type="text" name="fio" value={form.fio} onChange={(e)=>{ setForm({ ...form, fio: e.target.value }) }}/>
                    </Form.Group>
                    <Form.Group controlId="phone">
                        <Form.Label>Телефон</Form.Label>
                        <Form.Control type="text" name="phone" value={form.phone} onChange={(e)=>{ setForm({ ...form, phone: e.target.value }) }}/>
                    </Form.Group>
                    <Form.Group controlId="payment_type">
                        <Form.Label>Способ оплаты</Form.Label>
                        <Form.Control as="select" name="payment_type" value={form.payment_type} onChange={(e)=>{ setForm({ ...form, payment_type: e.target.value }) }}>
                            <option></option>
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

const mapStateToProps = ( state ) => ({ 
    basket: state.basket.list
})

export default connect(mapStateToProps)(Basket);