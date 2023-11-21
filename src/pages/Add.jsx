import React from 'react'
import { PlusCircle } from 'react-feather'
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { addVideo } from '../services/allapi';

// toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Add({handleRes}) {

  const [uploadData, setuploadData] = useState(
    {
      // backend datas
      id: "",
      caption: "",
      thumbnail: "",
      url: ""
    }
  )



  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const setInput = (e) => {
    // console.log(e.target.value);

    const { name, value } = e.target
    setuploadData({ ...uploadData, [name]: value })
                    // spread operator , key value pair
  }
  console.log(uploadData);

  // original url: https://www.youtube.com/watch?v=DvS1rlMA64c&ab_channel=MANUSHYAR

  // embeded code 
  // src="https://www.youtube.com/embed/DvS1rlMA64c"

  const extractUrl = (e) => {
    // url is stored in variable
    let youtubeUrl = e.target.value

    // check the url contain "v="
    if (youtubeUrl.includes("v=")) {

      // find the index number of "v="
      let index = youtubeUrl.indexOf("v=")
      console.log(index);

      // cut the 11 letters
      let videoUrl = youtubeUrl.substring(index + 2, index + 13)
      console.log(videoUrl);


      //  state is assigned in variable
      let videoData = uploadData

      videoData.url = `https://www.youtube.com/embed/${videoUrl}`

      //  above variable is re-assigned by state
      setuploadData(videoData)


    }

    console.log(uploadData);

  }



  // add button function
  // define handleAdd function

  const handleAdd = async () => {

    // destructure uploadData state
    const { id, caption, thumbnail, url } = uploadData

    if (!id || !caption || !thumbnail || !url) {
      toast("please fill the form completely",{
        position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
      })

    }
    else {

      // make an api call
      // function define in allapi.js
      // function call 
      const response = await addVideo(uploadData)

      // console.log(response);

      if (response.status >= 200 && response.status < 300) {

        handleRes(response.data)

        toast.success("new video upload successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",

        })
        // close the form
        setShow(false)
      }
      else {
        toast.warn("provide a unique id", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
      }

    }


  }


  return (
    <>
      <div onClick={handleShow} >
        <PlusCircle color='blue' size={90} />
      </div>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Upload Video Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Form>

            <FloatingLabel className='mb-3' controlId="floatingId" label="Uploading video id">
              <Form.Control type="text" placeholder="Video id" name='id' onChange={setInput} />
            </FloatingLabel>

            <FloatingLabel className='mb-3' controlId="floatingCaption" label="Uploading video caption">
              <Form.Control type="text" placeholder="Video caption" name='caption' onChange={setInput} />
            </FloatingLabel>

            <FloatingLabel className='mb-3' controlId="floatingImage" label="Uploading video cover image url">
              <Form.Control type="text" placeholder="Video cover image url" name='thumbnail' onChange={setInput} />
            </FloatingLabel>

            <FloatingLabel className='mb-3' controlId="floatingLink" label="Uploading video link">
              <Form.Control type="text" placeholder="Video link" name='url' onChange={extractUrl} />
            </FloatingLabel>

          </Form>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          {/* add function call in onclick event */}
          <Button variant="primary" onClick={handleAdd}>Add</Button>
        </Modal.Footer>
      </Modal>


      {/* toastify  */}

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />


    </>
  )
}

export default Add