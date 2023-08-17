import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { blogPostById, changeCover } from '../../Store/blogPostsSlice';
import Container from 'react-bootstrap/esm/Container';
import '../../App.css'
import { nanoid } from '@reduxjs/toolkit';
import { getCommentsByPostId } from '../../Store/commentsSlice';
import SingleComment from '../SingleComment/SingleComment';
import { Row, Col, Button } from 'react-bootstrap'
import NewCommentModal from './NewCommentModal';
import { BsPencilSquare } from 'react-icons/bs';




const PostDetail = () => {

  const [modifyCover, setModifyCover] = useState(false)
  const [newCover, setNewCover] = useState(null)

  const { id } = useParams();
  useEffect(() => {
    dispatch(blogPostById(id))
    dispatch(getCommentsByPostId(id))
  }, [])

  function saveChanges() {
    console.log(newCover)
    if (newCover) {
      const patchData = {
        id: id,
        cover: newCover,
      }
      dispatch(changeCover(patchData))
        .then(() => dispatch(blogPostById(id))).then(() => setModifyCover(false))
    }
  }




  const [show, setShow] = useState(false);

  const dispatch = useDispatch()
  const singlePost = useSelector(state => state.blogPosts.singlePost.blogPostsById)
  const actualTheme = useSelector(state => state.theme.theme)
  const allComments = useSelector(state => state.comment.comments.blogComments)
  /*  const commentDetails = useSelector(state => state.comment) */




  return (
    <>
      {singlePost && (<div className={actualTheme ? '' : 'dark-secondary text-light'}>
        <Container>
          <div className='py-3 d-flex flex-column align-items-center'>
            <span
              className='my-2 Rowdies'
              style={{ fontSize: '2rem', textAlign: 'center' }}
            >
              {singlePost.title}
            </span>
            {!modifyCover && (
              <img style={{ width: '70%', borderRadius: '50px' }} src={singlePost.cover} alt="" />
            )}
            {modifyCover && (
              <div
                className='d-flex flex-column justify-content-center align-items-center gap-2'
                style={{ width: '400px', height: '400px', borderRadius: '50%' }}>
                <input
                  type='file'
                  placeholder='Select a new avatar'
                  onChange={(e) => setNewCover(e.target.files[0])}
                />
                <div className='d-flex gap-3'>
                  <Button onClick={() => setModifyCover(false)} variant='danger'>Cancel</Button>
                  <Button onClick={() => saveChanges()} variant='success'>Save changes</Button>
                </div>
              </div>
            )}
            <div className='d-flex justify-content-around' style={{ width: '70%' }}>
              <em>Di: {singlePost.author.name}{singlePost.author.surname}</em>
              <em>Read Time: {singlePost.readTime.value}{singlePost.readTime.unit}</em>
              <div
                style={{ cursor: 'pointer' }}
                onClick={() => setModifyCover(true)}
              >
                <BsPencilSquare></BsPencilSquare>
                <em>Change Cover</em>
              </div>

            </div>
            <div
              className='my-4 Rowdies'
              style={{ width: '70%' }}>
              <p>DESCRIZIONE</p>
              {singlePost.content}
            </div>
          </div>
          <div className='text-center'>
            <NewCommentModal id={id} />
          </div>
          <div>
            <Row className='d-flex justify-content-center py-5 g-2'>
              {allComments && allComments.map((comment) => {
                return (
                  <Col className='col-lg-6 col-sm-12' key={comment._id}>
                    <SingleComment comment={comment} postId={id} />
                  </Col>
                )
              })}
            </Row>
          </div>

        </Container>

      </div>)}
    </>
  )
}

export default PostDetail