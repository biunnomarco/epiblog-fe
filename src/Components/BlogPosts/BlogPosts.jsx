import React, { useEffect, useState } from 'react'
import { nanoid } from 'nanoid'
import { useDispatch, useSelector } from 'react-redux';
import { postBlogPosts, getBlogPosts } from '../../Store/blogPostsSlice';
import SinglePost from './SinglePost';
import { Container, Row, Col, Button, Modal, Alert } from 'react-bootstrap';
import AddPostModal from '../AddPostModal/AddPostModal';
import { useSession } from '../../middlewares/ProtectedRoutes';

const BlogPosts = () => {

    const session = useSession()

    const [modalOpen, setModalOpen] = useState(false)
    function toggleModalOpen() {
        setModalOpen(!modalOpen)
    }


    const dispatch = useDispatch()
    const allPosts = useSelector(state => state.blogPosts)

    useEffect(() => {
        dispatch(getBlogPosts())
    }, [])



    return (
        <>  {session && (
            <Container className='d-flex justify-content-center mb-5 mt-3' style={{ width: '100%' }}>
                <Button
                    className='text-center'
                    variant="warning"
                    onClick={() => toggleModalOpen()}>
                    New Post
                </Button>
            </Container>
        )}
            {!session && (
                <div className='mx-5'>
                    <br />
                    <br />
                </div>
            )}

            {allPosts.status === 'pending' && (<div>Loading...</div>)}
            {allPosts.status === 'error' && (<div>Something went wrong...</div>)}
            {allPosts.searchStatus === '404' && (
                <Alert key='danger' variant='danger'>
                    Your search returned no results
                </Alert>)}
            {allPosts.searchStatus === 'loading' && (<div>Loading...</div>)}
            {allPosts.searchStatus === 'error' && (<div>Something went wrong...</div>)}
            
            {allPosts.posts && (<Container fluid >
                <Row className='g-4 mx-auto' key={nanoid()}>
                    {allPosts.posts && allPosts.posts.map((post) => {
                        return (
                            <Col className=' d-flex justify-content-center' key={nanoid()}>
                                <SinglePost post={post} />

                            </Col>
                        )
                    })}
                </Row>
            </Container>)}



            {modalOpen && (<AddPostModal close={toggleModalOpen} />)}



        </>
    )
}

export default BlogPosts