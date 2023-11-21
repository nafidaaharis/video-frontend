import React, { useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';


// toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addCategory, deleteCategoy, getVideos, getallCategories, updateCategory } from '../services/allapi';
import { Trash2 } from 'react-feather';
import { Col, Row } from 'react-bootstrap';
import Videocard from './Videocard';





function Category() {

  const [allCategory, setallCategory] = useState([])

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [categoryItem, setcategoryItem] = useState({
    id: "",
    name: "",
    allVideos: []
  })

  const addcategoryForm = (e) => {

    const { name, value } = e.target

    // spread operator 

    setcategoryItem({ ...categoryItem, [name]: value })


  }

  console.log(categoryItem);

  const handleAddCategory = async (e) => {

    // for not refreshing automatically 

    e.preventDefault()

    // destructuring 

    const { id, name } = categoryItem

    if (!id || !name) {

      toast.warn("please fill the form completely")

    }
    else {
      let response = await addCategory(categoryItem)

      toast.success('category added successful')

      console.log(response);
      getcategoryList()
      setShow(false)
    }

  }

  // get all category 

  const getcategoryList = async () => {

    const response = await getallCategories()

    console.log(response.data);
    setallCategory(response.data)

  }
  console.log(allCategory);

  useEffect(() => {

    getcategoryList()

  }, [])

  const handleDeletecategory = async (e, id) => {
    e.preventDefault()
    console.log(id);

    await deleteCategoy(id)

    //  to display all other categories

    getcategoryList()

  }


  const dragOver = e => {
    e.preventDefault()
    // checking the drag option is functioning
    console.log('dragging over the board!!!');


  }

  const dropped= async(e,categoryId)=>{
    console.log(categoryId);

    let sourceCardId=e.dataTransfer.getData('cardId')
    console.log('source card id',sourceCardId);
 
    // logic to implement adding card in given category 

    let {data}= await getVideos(sourceCardId)
    // console.log(response);

    console.log('source video data',data);

    let selectedCategory=allCategory.find(item=>item.id==categoryId)

    console.log('target category details',selectedCategory);

    selectedCategory.allVideos.push(data)

    console.log('updated targeted category detail',selectedCategory);

    await updateCategory(categoryId,selectedCategory)

    getcategoryList()
  }




  return (
    <>
      <div className='d-grid'>
        <div onClick={handleShow} className='btn btn-dark m-2'>
          Add Category
        </div>

        {
          allCategory?.map(item => (
            <div droppable onDragOver={e => dragOver(e)}
              onDrop={e => dropped(e, item?.id)}

              className='d-flex justify-content-between border round mt-2 p-3'>
              <h4>{item.name}</h4>
              <span onClick={e => handleDeletecategory(e, item?.id)}><Trash2 color='red' /></span>

            <div>
                <Row>
  
                  {
                    item?.allVideos.map((card)=>(
                      <Col className='p-3 mb-1 sm={12}' >

                        <Videocard card={card} insidecategory={true}/>

                      </Col>
                    ))
                  }
  
  
                </Row>
            </div>

            </div>
          ))
        }
      </div>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add category</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <FloatingLabel className='mb-3' controlId="floatingLink" label="Id">
            <Form.Control type="text" name='id' onChange={addcategoryForm} placeholder="Id" />
          </FloatingLabel>

          <FloatingLabel className='mb-3' controlId="floatingLink" label="catogory">
            <Form.Control type="text" name='name' onChange={addcategoryForm} placeholder="catogory" />
          </FloatingLabel>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button onClick={handleAddCategory} variant="primary">Add</Button>
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

export default Category