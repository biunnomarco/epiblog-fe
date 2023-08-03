import React from 'react'
import { Button, Modal, FloatingLabel, Form, Alert } from 'react-bootstrap';
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getBlogPosts, postBlogPosts } from '../../Store/blogPostsSlice';
import { useSession } from '../../middlewares/ProtectedRoutes';



const AddPostModal = ({ close }) => {

    const dispatch = useDispatch()
    const session = useSession()


    const [category, setCategory] = useState('')
    const [title, setTitle] = useState('')
    const [cover, setCover] = useState(null) //?
    const [readTimeValue, setReadTimeValue] = useState('')
    const [readTimeUnit, setReadTimeUnit] = useState('')
    const [content, setContent] = useState('')
    const [empty, setEmpty] = useState(false)

    const handleFileChange = (e) => {
        setCover(e.target.files[0]);
    }


    const submitForm = async (e) => {
        e.preventDefault();

        if (category && title && cover && content) {
            const postPayload = {
                "category": category,
                "title": title,
                "cover": cover,
                "readTime": {
                    "value": readTimeValue,
                    "unit": readTimeUnit
                },
                "author": session.id,
                "content": content
            }
            console.log(postPayload)

            dispatch(postBlogPosts(postPayload))
                .then(() => close())
                .then(() => dispatch(getBlogPosts()))

        } else {
            setEmpty(true)
        }

    }

    return (
        <> {session && (
            <div
                className="modal show"
                style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
            >
                <Modal.Dialog centered size="lg" backdrop="static">
                    <Modal.Header>
                        <Modal.Title>New Post</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <form onSubmit={submitForm}>
                            <div className='my-1'><input style={{ borderRadius: '5px' }} placeholder='category' type="text" onChange={(e) => setCategory(e.target.value)} /></div>
                            <div className='my-1'><input style={{ borderRadius: '5px' }} placeholder='title' type="text" onChange={(e) => setTitle(e.target.value)} /></div>
                            <div className='my-1'><input style={{ borderRadius: '5px' }} placeholder='read time value' type="text" onChange={(e) => setReadTimeValue(e.target.value)} /></div>
                            <div className='my-1'><input style={{ borderRadius: '5px' }} placeholder='read time unit' type="text" onChange={(e) => setReadTimeUnit(e.target.value)} /></div>
                            <div className='my-1'><input placeholder='cover' type="file" onChange={handleFileChange} /></div>
                            {/* <input placeholder='author id' type="text" onChange={(e) => setAuthor(e.target.value)} /> */}

                            <FloatingLabel controlId="floatingTextarea2" label="Post">
                                <Form.Control
                                    as="textarea"
                                    placeholder="Post content"
                                    style={{ height: '100px' }}
                                    onChange={(e) => setContent(e.target.value)}
                                />
                            </FloatingLabel>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={close}>Close</Button>
                                <Button variant="primary" type='submit'>Post</Button>
                            </Modal.Footer>
                        </form>
                        {empty && (<Alert key='danger' variant='danger'>
                            All fields must be compiled!
                        </Alert>)}

                    </Modal.Body>

                </Modal.Dialog>
            </div>
        )}
            
        </>
    )
}

export default AddPostModal