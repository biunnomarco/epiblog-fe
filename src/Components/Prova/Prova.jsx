import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAuthors, postAuthors } from '../../Store/authorSlice';
import { UseSelector } from 'react-redux/es/hooks/useSelector';
import SingleAuthor from '../SingleAuthor/SingleAuthor';
import { nanoid } from 'nanoid';



const Prova = () => {

    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [email, setEmail] = useState('')
    const [birthdate, setBirthdate] = useState('')
    const [avatar, setAvatar] = useState('')


    const dispatch = useDispatch()
    const allAuthors = useSelector(state => state.authors)

    useEffect(() => {
        dispatch(getAuthors())
        
    }, [])

    return (
        <>
            <div className='d-flex flex-wrap gap-3'>
                {allAuthors.authors && allAuthors.authors.map((author) => {
                    return (
                        <SingleAuthor author={author}/>
                    )
                })}
            </div>

        </>
    )
}

export default Prova