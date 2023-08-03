import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { nanoid } from 'nanoid';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAuthor, getAuthors } from '../../Store/authorSlice';
import { BsFillTrashFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import '../SingleAuthor/SingleAuthor.css'
import '../../App.css'
import { useSession } from '../../middlewares/ProtectedRoutes';

const SingleAuthor = (author) => {

    const dispatch = useDispatch();
    const session = useSession()
    const actualTheme = useSelector(state => state.theme.theme)

    function pushDelete(id) {
        if ( session.role === 'moderator') {
            dispatch(deleteAuthor(id)).then(() => dispatch(getAuthors()))
        }
    }

    return (
        <>
            <Card key={nanoid()} className={actualTheme ? 'author-card': 'author-card bg-dark text-light'} >
            
                <Card.Img className='author-img' src={author.author.avatar} />
                <Card.Body>
                    <Card.Title 
                    as={Link} 
                    to={`/authors/${author.author._id}`}
                    className='h4'
                    >
                        {author.author.name + ' ' + author.author.surname}
                    </Card.Title>
                    <Card.Title style={{ fontSize: '0.8rem' }}>{author.author.birthdate}</Card.Title>
                    <Card.Title style={{ fontSize: '0.8rem' }}>{author.author.email}</Card.Title>
                    <Card.Title style={{ fontSize: '0.8rem' }}>Role: {author.author.role}</Card.Title>
                    

                    {session.role === 'moderator' && (
                        <Button className='px-2 py-1' variant="outline-danger">
                            <BsFillTrashFill variant="danger" onClick={() => pushDelete(author.author._id)} />
                        </Button>
                    )}
                    
                </Card.Body>
            </Card>
        </>
    )
}

export default SingleAuthor