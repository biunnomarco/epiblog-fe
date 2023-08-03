import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAuthors } from '../../Store/authorSlice'
import SingleAuthor from '../SingleAuthor/SingleAuthor'
import { Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import '../../App.css'

const AllAuthors = () => {

    const dispatch = useDispatch()
    const allAuthors = useSelector(state => state.authors)
    const actualTheme = useSelector(state => state.theme.theme)

    useEffect(() => {
        dispatch(getAuthors())
    }, [])

    return (
        <div
            /* style={{ height: '100%' }} */
            className={actualTheme ? '' : 'dark-secondary text-light'}>
            <Container className='py-5'>
                <h2
                    className='pb-3 text-center'
                    style={{ fontFamily: 'cursive' }}
                >
                    All Authors
                </h2>
                {allAuthors.state === 'pending' && (<div>Loading...</div>)}
                <Row className='d-flex flex-wrap g-2'>
                    {allAuthors.authors.map((author) => {
                        return (
                            <div className='col-xl-4 col-md-6'>
                                <SingleAuthor author={author} />
                            </div>
                        )
                    })}
                </Row>
            </Container>
        </div>
    )
}

export default AllAuthors