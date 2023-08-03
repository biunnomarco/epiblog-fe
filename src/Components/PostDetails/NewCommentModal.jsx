import { useEffect, useState } from 'react';
import { Button, Alert } from 'react-bootstrap';
import Offcanvas from 'react-bootstrap/Offcanvas'; import React from 'react'
import { useSession } from '../../middlewares/ProtectedRoutes';
import { useDispatch } from 'react-redux';
import { getCommentsByPostId, postNewComment } from '../../Store/commentsSlice';


const NewCommentModal = (id) => {

    const dispatch = useDispatch()
    const session = useSession()
    

    const [show, setShow] = useState(false);
    const [newTitle, setNewTitle] = useState('')
    const [newRate, setNewRate] = useState('')
    const [newContent, setNewContent] = useState('')
    const [empty, setEmpty] = useState(false)


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const postComment = async (e) => {
        e.preventDefault()

        if (newTitle && newRate && newContent) {
            const datas = {
                payload: {
                    author: session.id,
                    title: newTitle,
                    content: newContent,
                    rate: newRate
                },
                id: id
            }
            setEmpty(false)
            dispatch(postNewComment(datas))
                .then(() => dispatch(getCommentsByPostId(id.id)))
                .then(() => handleClose())
        } else (setEmpty(true))
    }

    return (
        <>
            <Button variant="warning" onClick={handleShow}>
                Add Comment
            </Button>

            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Add a new Comment</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>

                    <form onSubmit={postComment}>
                        <div className='my-1'>
                            <input
                                style={{ borderRadius: '5px' }}
                                placeholder='Title'
                                type="text"
                                onChange={(e) => setNewTitle(e.target.value)} />
                        </div>
                        <div className='my-1'>
                            <input
                                style={{ borderRadius: '5px' }}
                                placeholder='Rate (1-5)'
                                type="number"
                                onChange={(e) => setNewRate(e.target.value)} />
                        </div>
                        <div className='my-1'>
                            <input
                                style={{ borderRadius: '5px' }}
                                placeholder='Comment'
                                type="text"
                                onChange={(e) => setNewContent(e.target.value)} />
                        </div>

                        <Button type='submit' variant='success'>
                            Send Comment
                        </Button>
                        {empty && (
                            <Alert key='danger' variant='danger' className='my-2'>
                                All fields must be compiled!!!
                            </Alert>
                        )}
                    </form>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}

export default NewCommentModal