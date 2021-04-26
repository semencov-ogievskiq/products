import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import {
    Row, Col, Spinner
} from 'react-bootstrap'

const User = props => {
    const [ loading, setLoading ] = useState(false)
    const [ user, setUser ] = useState({})

    useEffect(()=>{
        const source = axios.CancelToken.source()
        setLoading(true)
        axios.get('http://localhost:80/clientData', { cancelToken: source.token })
            .then((res)=>{
                console.log(res.data)
                setUser({...res.data.client})
                setLoading(false)
            })
            .catch((err)=>{ 
                console.log(err) 
                setLoading(false)
            })
        return ()=>{ source.cancel('Размантирован') }
    },[])

    return (
        <>
            <Row>
                {( loading )? 
                    <Col className="text-center my-2" xs={12}>
                        <Spinner animation="border"/>
                    </Col>
                :
                    <Col sm="12"><h1>{user.f} {user.i} {user.o}</h1></Col>
                }
            </Row>
        </>
    )
}

export default connect()(User)