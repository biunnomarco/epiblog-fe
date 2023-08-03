import React from 'react'
import { Card, Button } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import '../BlogPosts/SinglePost.css'
import { UseSelector, useSelector } from 'react-redux/es/hooks/useSelector';
import { Link } from 'react-router-dom';

const SinglePost = (post) => {

  const actualTheme = useSelector(state => state.theme.theme)
  
  return (
    <Card
      style={{ width: '20rem', textDecoration: 'none' }}
      className={actualTheme ? "single-post" : 'single-post bg-dark text-light'}
    >
      <Card.Img style={{ height: '10rem', objectFit: 'cover' }} variant="top" src={post.post.cover} />
      <Card.Body style={{ height: '115px' }}>
        <Card.Title className='post-title'>{post.post.title}</Card.Title>
        <Card.Text className='post-content'>{post.post.content}</Card.Text>
      </Card.Body>
      <Card.Body className='d-flex gap-3'>
        <Card.Text>In: &nbsp;<em style={{ fontSize: '.8rem', /* color: '#00000070'  */ }}>{post.post.category}</em></Card.Text>
        <Card.Text>
          Read Time: &nbsp;<em style={{ fontSize: '.8rem', /* color: '#00000070' */ }}>{post.post.readTime.value} {post.post.readTime.unit}</em> </Card.Text>
      </Card.Body>

      <Card.Footer className='d-flex justify-content-between align-items-center'>
        <Card.Title style={{ fontSize: '.8rem', margin: '0' }}>
        <img className='mx-1' src={post.post.author.avatar} style={{width: '25px', height: '25px', borderRadius: '50%'}} />
          {post.post.author.name} {post.post.author.surname}
        </Card.Title>
        <Card.Text>

        <Link to={`/postDetails/${post.post._id}`}>                  
          <Button size='sm'>Read all</Button>
        </Link>

        </Card.Text>
      </Card.Footer>
    </Card>
  )
}

export default SinglePost