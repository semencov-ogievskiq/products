import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import {
    Row, Col, Spinner, Form, Button
} from 'react-bootstrap'

const User = props => {
    const [ loading, setLoading ] = useState(false)
    const [ user, setUser ] = useState({})
    const [ form, setFrom ] = useState({})

    useEffect(()=>{
        const source = axios.CancelToken.source()
        setLoading(true)
        axios.get('http://localhost:80/clientData', { cancelToken: source.token })
            .then((res)=>{
                for( var i in res.data.client ) { 
                    if( res.data.client[i] === null )  res.data.client[i] = ''
                }
                setUser(res.data.client)
                setFrom(res.data.client)
                setLoading(false)
            })
            .catch((err)=>{ 
                console.log(err) 
                setLoading(false)
            })
        return ()=>{ source.cancel('Размантирован') }
    },[props.client])

    const submit = ev => {
        ev.preventDefault()
        setLoading(true)
        axios.post(`http://localhost:80/users/${user.id}`,form)
            .then(()=>{
                setLoading(false)
            })
            .catch((err)=>{
                console.log(err)
                setLoading(false)
            })
    }

    const reset = ev => {
        ev.preventDefault()
        setFrom(user)
    }

    return (
        <>
            <Row>
                {( loading )? 
                    <Col className="text-center my-2" xs={12}>
                        <Spinner animation="border"/>
                    </Col>
                :
                    <>
                        <Col sm="12"><h1>{user.mail}</h1></Col>
                        <Col sm="12">
                            <Form onSubmit={submit} onReset={reset}>
                                <Form.Group controlId="f">
                                    <Form.Label>Фамилия</Form.Label>
                                    <Form.Control type="text" value={form.f} onChange={ ev => { setFrom({...form, f: ev.target.value }) } }/>
                                </Form.Group>
                                <Form.Group controlId="i">
                                    <Form.Label>Имя</Form.Label>
                                    <Form.Control type="text" value={form.i} onChange={ ev => { setFrom({...form, i: ev.target.value }) } }/>
                                </Form.Group>
                                <Form.Group controlId="o">
                                    <Form.Label>Отчество</Form.Label>
                                    <Form.Control type="text" value={form.o} onChange={ ev => { setFrom({...form, o: ev.target.value }) } }/>
                                </Form.Group>
                                <Form.Group controlId="dt_birth">
                                    <Form.Label>Дата рождения</Form.Label>
                                    <Form.Control type="text" value={form.dt_birth} onChange={ ev => { setFrom({...form, dt_birth: ev.target.value }) } }/>
                                </Form.Group>
                                <Form.Group controlId="phone">
                                    <Form.Label>Телефон</Form.Label>
                                    <Form.Control type="text" value={form.phone} onChange={ ev => { setFrom({...form, phone: ev.target.value }) } }/>
                                </Form.Group>
                                <Form.Group controlId="address">
                                    <Form.Label>Адрес</Form.Label>
                                    <Form.Control type="text" value={form.address} onChange={ ev => { setFrom({...form, address: ev.target.value }) } }/>
                                </Form.Group>
                                <div>
                                    <Button type="reset" className="float-left" disabled={user===form} variant="secondary">Сбросить</Button>
                                    <Button type="submit" className="float-right" disabled={user===form} variant="primary">Сохранить</Button>
                                </div>
                            </Form>
                        </Col>
                    </>
                }
            </Row>
        </>
    )
}

const mapStateToProps = ( state ) => ({ 
    client: state.client.client
})

export default connect(mapStateToProps)(User)