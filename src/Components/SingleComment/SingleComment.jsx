import React from 'react'
import { Card, Button } from 'react-bootstrap'
import '../SingleAuthor/SingleAuthor.css'
import { useSession } from '../../middlewares/ProtectedRoutes';
import { BsFillTrashFill, BsPencilFill } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { deleteComment, getCommentsByPostId } from '../../Store/commentsSlice';

const SingleComment = (comment) => {

    const dispatch = useDispatch()

    const removeComment = () => {
        console.log(comment)
        dispatch(deleteComment(comment))
            .then(()=>dispatch(getCommentsByPostId(comment.postId)))
    }

    const session = useSession()
    return (
        <Card  className='comment-card' >
            <Card.Img className='author-img' src={comment.comment.author.avatar} />
            <Card.Body>
                <Card.Title>{comment.comment.title}</Card.Title>
                <Card.Title style={{ fontSize: '0.9rem' }}>{comment.comment.content}</Card.Title>
                <Card.Title style={{ fontSize: '0.8rem' }}> RATE: {comment.comment.rate}</Card.Title>


                <footer style={{ fontSize: '0.8rem' }}>
                    User: <b>{comment.comment.author.name} {comment.comment.author.surname}</b>
                    <br />
                    Role: <b>{comment.comment.author.role}</b>
                </footer>
            </Card.Body>
            {session.role === 'moderator' && (
                <Card.Footer className='d-flex flex-column justify-content-around'>
                    <Button onClick={()=>removeComment()} className='px-2 py-1' variant="outline-danger">
                        <BsFillTrashFill variant="danger" />
                    </Button>
                    <Button className='px-2 py-1' variant="outline-success">
                        <BsPencilFill variant="success" />
                    </Button>
                </Card.Footer>
            )}
        </Card>
    )
}

export default SingleComment