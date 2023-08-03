import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useSession } from '../../middlewares/ProtectedRoutes'

const Success = () => {

    const token = useParams()
    const navigate = useNavigate()
    const session = useSession()
  

    useEffect(() => {
        if (token) {
            {localStorage.setItem('userLoggedIn', JSON.stringify(token.token))}
            
            /* {setTimeout(() => {
                navigate('/')
            }, 5000)} */
        }
    }, [])
    
  return (
    <div>Stai per essere reindirizzato alla Hompage</div>
  )
}

export default Success