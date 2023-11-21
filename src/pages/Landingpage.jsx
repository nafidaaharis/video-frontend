
import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'



function Landingpage() {

    // useNavigate() is a hook

    const navigate=useNavigate()

    const handleNavigate=()=>{
        // navigate to home page
        navigate('/home')
    }

  return (
    <div>

        <Row className='align-items-center'>
            <Col></Col>
            <Col lg={6}>
                <h1>welcome to video.com</h1>
                <p style={{textAlign:'justify'}}>where user can use their favourite videos user can upload any youtube videos by copy and past their url.
                    video.com will allow to add and remove their uploaded videos and also arrange them in different categories
                    by drag and drop .it is free  ,try it now!!!!!!!!
                </p>
                <button onClick={handleNavigate} className='btn btn-info'>Click here to know more!!!</button>
            </Col>
            <Col lg={4}>
                <img className='img-fluid' src="https://www.computerhope.com/jargon/w/wmp.png" alt="" />
            </Col>
            <Col></Col>
        </Row>

    </div>
  )
}

export default Landingpage