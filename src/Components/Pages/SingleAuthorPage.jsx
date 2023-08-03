import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getAuthorById } from '../../Store/authorSlice'
import { Container, Col, Row } from 'react-bootstrap'
import SinglePost from '../BlogPosts/SinglePost'
import { nanoid } from 'nanoid'
import '../../App.css'

const SingleAuthorPage = () => {

  const { id } = useParams()
  const dispatch = useDispatch()
  const authorInfo = useSelector(state => state.authors.singleAuthor.authorById)
  const actualTheme = useSelector(state => state.theme.theme)

  useEffect(() => {
    dispatch(getAuthorById(id))
  }, [])



  return (
    <div className={actualTheme ? '' : 'dark-secondary text-light'}>
      {authorInfo && (<>
        <Container className='py-4'>
          <Row className='d-flex align-items-center'>
            <Col className='text-center'>
              <img
                style={{ width: '400px', height: '400px', borderRadius: '50%' }}
                src={authorInfo.avatar} alt="avatar" />
            </Col>
            <Col>
              <h3 style={{ fontFamily: 'monospace' }}>Name: {authorInfo.name}</h3>
              <h3 style={{ fontFamily: 'monospace' }}>Surname: {authorInfo.surname}</h3>
              <h3 style={{ fontFamily: 'monospace' }}>Email: {authorInfo.email}</h3>
              <h3 style={{ fontFamily: 'monospace' }}>Role: {authorInfo.role}</h3>
              <h3 style={{ fontFamily: 'monospace' }}>Iscritto il: {(authorInfo.updatedAt)}</h3>
            </Col>
          </Row>
        </Container>
        <hr />
        <h3 className='text-center'>All {authorInfo.name}'s posts</h3>
        <Container className='py-4'>
          <Row>
            {authorInfo && authorInfo.posts.map((post) => {
              return (
                <Col className=' d-flex justify-content-center' key={nanoid()}>
                  <SinglePost post={post} />
                </Col>
              )
            })}
          </Row>
        </Container>
      </>
      )}

    </div>
  )
}

export default SingleAuthorPage