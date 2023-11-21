import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import Videocard from './Videocard'
import {getVideo} from '../services/allapi'



function View({serverResponse}) {

  const [allVideos,setallVideos]=useState([])

  const [deleteStatus,setdeleteStatus]=useState(false)

  const handleDeleteStatus=(res)=>{
    setdeleteStatus(res)

  }

  const getallVideos = async () => {
    let response = await getVideo()
    // console.log(response.data);

    setallVideos(response.data)
  }

  console.log(allVideos);

 
  useEffect(() => {
    getallVideos()
  
  }, [serverResponse,deleteStatus])

 
  


  return (
    <div className='border p-3 rounded' >

      <Row>
        {
           allVideos.map(video=>(

            <Col className='ps-3 mb-3' sm={12} md={6} >
            <Videocard card={video} handleDeleteStatus={handleDeleteStatus}/>
          </Col>

           ))
       
        }
      </Row>

    </div>
  )
}

export default View