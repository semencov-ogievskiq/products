import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {
    Modal, Form, Button, ProgressBar, Alert
} from 'react-bootstrap'
import { login, removeFetch } from '../store/reducers/client'
import { go } from 'connected-react-router'

const LoginModal = props => {
    const [ mail, setMail ] = useState('')
    const [ password, setPassword ] = useState('')

    useEffect(()=>{
        if( props.show && props.token ) props.onHide()
    })
    
    const onShow = () => {
        setMail('')
        setPassword('')
        props.dispatch( removeFetch() )
    }
    const onSubmit = async ev => {
        ev.preventDefault()
        props.dispatch( login( mail, password, onLogin ) )
    }

    const onLogin = () => {
        if( props.token ){
            props.dispatch(go(0))
        }else{
            setPassword('')
        }
    }


    return (
        <Modal size="lg" show={props.show} onHide={props.onHide} onShow={onShow} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Авторизация 
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {(props.fetch)? <ProgressBar now={props.fetch_progress} label={`${props.fetch_progress}%`}/> : null}
                {(props.fetch_err)? <Alert variant="danger">{props.fetch_err}</Alert> : null}
                <Form onSubmit={onSubmit}>
                    <Form.Group controlId="mail">
                        <Form.Label>Mail</Form.Label>
                        <Form.Control type="mail" name="mail" value={mail} required disabled={props.fetch} onChange={(e)=>{ setMail( e.target.value ) }}/>
                    </Form.Group>
                    <Form.Group controlId="password">
                        <Form.Label>Пароль</Form.Label>
                        <Form.Control type="password" name="password" required disabled={props.fetch} value={password} onChange={(e)=>{ setPassword( e.target.value ) }}/>
                    </Form.Group>
                    <div>
                        <Button as={Link} to="/registration" variant="success" disabled={props.fetch} style={{width: '10rem', marginLeft: '2rem'}}>Регистрация</Button>
                        <Button type="submit" variant="primary" disabled={props.fetch} style={{width: '10rem', float: 'right', marginRight: '2rem'}}>Вход</Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

const mapStateToProps = ( state ) => ({ 
    ...state.client
})

export default connect(mapStateToProps)(LoginModal);