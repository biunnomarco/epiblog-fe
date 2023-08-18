import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { changeAvatar, getAuthorById } from '../../Store/authorSlice'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { BsPencilFill } from 'react-icons/bs';



const Dashboard = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const actualTheme = useSelector(state => state.theme.theme)
    const authorInfo = useSelector(state => state.authors.singleAuthor.authorById)
    const [modifyAvatar, setModifyAvatar] = useState(false)
    const [newAvatar, setNewAvatar] = useState(null)

    useEffect(() => {
        dispatch(getAuthorById(id))
    }, [])

    function saveChanges() {
        console.log(newAvatar)
        if (newAvatar) {
            const patchData = {
                id: id,
                avatar: newAvatar
            }
            dispatch(changeAvatar(patchData))
                .then(()=>dispatch(getAuthorById(id))).then(()=>setModifyAvatar(false))
        }

    }

    return (
        <div className={actualTheme ? '' : 'dark-secondary text-light'}>
            {authorInfo && (<Container className='py-4'>
                <Row className='d-flex align-items-center'>
                    <Col className=' py-3 text-center'>
                        <div  style={{ width: '400px', height: '400px', borderRadius: '50%', position: 'relative' }}>

                            {!modifyAvatar && (<img
                                style={{ width: '400px', height: '400px', borderRadius: '50%' }}
                                src={authorInfo.avatar} alt="avatar" />)}

                            {modifyAvatar && (<div
                                className='d-flex flex-column justify-content-center align-items-center gap-2'
                                style={{ width: '400px', height: '400px', borderRadius: '50%' }}>
                                <input
                                    type='file'
                                    placeholder='Select a new avatar'
                                    onChange={(e) => setNewAvatar(e.target.files[0])}
                                />
                                <div className='d-flex gap-3'>
                                    <Button onClick={() => setModifyAvatar(false)} variant='danger'>Cancel</Button>
                                    <Button onClick={() => saveChanges()} variant='success'>Save changes</Button>
                                </div>
                            </div>)}
                            <div onClick={() => setModifyAvatar(true)} style={{cursor: 'pointer'}}>
                                <BsPencilFill />
                                <em>Change Avatar</em>
                            </div>
                            
                        </div>
                    </Col>
                    <Col>
                        <h3 style={{ fontFamily: 'monospace' }}>Name: {authorInfo.name}</h3>
                        <h3 style={{ fontFamily: 'monospace' }}>Surname: {authorInfo.surname}</h3>
                        <h3 style={{ fontFamily: 'monospace' }}>Email: {authorInfo.email}</h3>
                        <h3 style={{ fontFamily: 'monospace' }}>Role: {authorInfo.role}</h3>
                        <h3 style={{ fontFamily: 'monospace' }}>Iscritto il: {(authorInfo.updatedAt)}</h3>
                    </Col>
                </Row>
            </Container>)}


        </div>
    )
}

export default Dashboard