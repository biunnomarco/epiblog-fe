import { Button, Container, Form, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import '../MyNav/MyNav.css'
import { Link, NavLink } from 'react-router-dom';
import nekoLight from '../../Assets/nekoLight.png'
import nekoDark from '../../Assets/nekoDark.png'

import React, { useEffect } from 'react'
import { changeTheme } from '../../Store/themeSlice';

import { TbBulbOff, TbBulb } from 'react-icons/tb';
import { nanoid } from '@reduxjs/toolkit';
import { useSession } from '../../middlewares/ProtectedRoutes';
import { getAuthorById, getAuthors } from '../../Store/authorSlice';
const userSession = JSON.parse(localStorage.getItem('userLoggedIn'))



const MyNav = () => {

  const dispatch = useDispatch()
  const actualTheme = useSelector(state => state.theme.theme)
  const user = useSelector(state => state.authors.singleAuthor.authorById)
  const session = useSession()
  console.log(session)

  /* useEffect(() => {
    
  }, []) */

  function selectTheme() {
    dispatch(changeTheme())
  }

  function logOut() {
    localStorage.removeItem('userLoggedIn')
    window.location.reload();
  }

  return (
    <Navbar
      expand="lg"
      className={actualTheme ? "bg-light" : "bg-dark"}
      variant={actualTheme ? "bg-light" : "dark"}
      sticky='top'
    >
      <Container className='container'>
        <Link style={{ textDecoration: 'none' }} to={'/'}>
          {actualTheme && (
            <Navbar.Brand href="#"><img src={nekoLight} alt="logo" /></Navbar.Brand>
          )}
          {!actualTheme && (
            <Navbar.Brand href="#"><img src={nekoDark} alt="logo" /></Navbar.Brand>
          )}

        </Link>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link as={Link} to={'/authors'}>All Authors</Nav.Link>
          </Nav>
          <Form className="d-flex">
            {!localStorage.getItem('userLoggedIn') ?
              <Link to={`/login`}><Button variant="outline-success" >Log-In</Button></Link> :
              <>
                <NavDropdown
                  title={<img style={{ width: '45px', height: '45px', borderRadius: '50px', border: 'solid 3px green' }} src={session.avatar || session.photos[0].value } />}
                  id="navbarScrollingDropdown"
                  className='mx-2'>
                    <NavDropdown.Item as={Link} to={`/dashboard/${session.id}`}>Your Dashboard</NavDropdown.Item>
                </NavDropdown>
                <Button onClick={() => logOut()} variant="outline-success" >Log-out</Button>
              </>
            }

            {actualTheme && (
              <TbBulbOff className='light' style={{ fontSize: '2.5rem' }} onClick={() => selectTheme()} />
            )}
            {!actualTheme && (
              <TbBulb className='dark' style={{ fontSize: '2.5rem' }} onClick={() => selectTheme()} />
            )}

          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default MyNav