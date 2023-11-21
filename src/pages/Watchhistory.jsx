import React, { useEffect, useState, } from 'react'
import { getHistory } from '../services/allapi'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'react-feather'


function Watchhistory() {

  const [history, setHistory] = useState([])

  const getWatchHistory = async () => {

    // data is used for destructuring 
    const { data } = await getHistory()
    // console.log(data);


    // updating the destructured data to the state function 
    setHistory(data)

  }
  console.log(history);

  useEffect(() => {
    getWatchHistory()


  }, [])




  return (
    <>

      <div className='d-flex justify-content-center align-items-center'>
        <h1 className='me-5'>Watch History </h1>

        <Link to={'/home'} style={{textDecoration:"none",fontSize:"20px",color:"orange",fontWeight:"bolder"}}>
         <span><ArrowLeft/></span> Back</Link>
      </div>

      <table className='table-shadow border rounded m-3'>
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Url</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>


          {
            history?.map((item, index) => (

              <tr>
                <td>{index + 1}</td>
                <td>{item.cardName}</td>
                <td>{item.url}</td>
                <td>{item.date}</td>

              </tr>
            ))
          }


        </tbody>
      </table>

    </>
  )
}

export default Watchhistory