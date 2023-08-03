import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
import { useSelector } from 'react-redux';

const Footer = () => {
    const actualTheme = useSelector(state => state.theme.theme)
  return (
    <div className={actualTheme ? '' : 'text-light'}>
    <MDBFooter bgColor={actualTheme ? 'light' : 'dark'} className='text-center text-lg-start'>
      <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
        <div className='me-5 d-none d-lg-block'>
          <span>Get connected with us on social networks:</span>
        </div>

        <div>
          <a href='https://www.instagram.com/marco_biunno/' target='_blank' className='me-4 text-reset'>
            <MDBIcon color='secondary' fab icon='instagram' />
          </a>
          <a href='https://it.linkedin.com/in/marco-biunno-176439153' target='_blank' className='me-4 text-reset'>
            <MDBIcon color='secondary' fab icon='linkedin' />
          </a>
          <a href='https://github.com/biunnomarco' target='_blank' className='me-4 text-reset'>
            <MDBIcon color='secondary' fab icon='github' />
          </a>
        </div>
      </section>

      <section className=''>
        <MDBContainer className='text-center text-md-start mt-5'>
          <MDBRow className='mt-3'>
            <MDBCol md='3' lg='4' xl='3' className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>
                <MDBIcon color='secondary' icon='gem' className='me-3' />
                Neko Blog 
              </h6>
              <p>
                Neko Blog is an exercise blog made with React and Mongo DB with the help of Redux and Bootstraps
              </p>
            </MDBCol>

            <MDBCol md='2' lg='2' xl='2' className='mx-auto mb-1'>
              <h6 className='text-uppercase fw-bold mb-4'>Products</h6>
              <p>
                <a href='https://it.legacy.reactjs.org/' className='text-reset'>
                  React
                </a>
              </p>
              <p>
                <a href='https://react-bootstrap.github.io/' className='text-reset'>
                  React Bootstraps
                </a>
              </p>
              <p>
                <a href='https://www.mongodb.com/it-it' className='text-reset'>
                  MongoDB
                </a>
              </p>
              <p>
                <a href='https://redux-toolkit.js.org/' className='text-reset'>
                  Redux
                </a>
              </p>
            </MDBCol>

            

            <MDBCol md='4' lg='3' xl='3' className='mx-auto mb-md-0 mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
              <p>
                <MDBIcon color='secondary' icon='home' className='me-2' />
                Cormano, MI, 2032, IT
              </p>
              <p>
                <MDBIcon color='secondary' icon='envelope' className='me-3' />
                biunnomarco@gmail.com
              </p>
              <p>
                <MDBIcon color='secondary' icon='phone' className='me-3' /> + 39 371 315 43 44
              </p>
              <p>
                <MDBIcon color='secondary' icon='print' className='me-3' /> + 01 234 567 89
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        © 2023 Copyright: Biunno Marco
       
      </div>
    </MDBFooter>
    </div>
  )
}

export default Footer