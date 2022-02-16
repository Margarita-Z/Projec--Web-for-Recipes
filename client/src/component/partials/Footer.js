import React from 'react';
import logo from '../logo/logoFooter.svg';
import '../css/footer.css'
import { Container, Navbar, Nav } from 'react-bootstrap';


function Footer() {
    return (
        
        <Navbar className="footer">
           <Container >
        <Nav.Link href="/" className="link-image" >
            <img src={logo}  />
        </Nav.Link>

        <Nav className="navFooter" as='ul' >
            <Nav.Item as="li" className="footer-category">
                <Nav.Link href="" className="footer-category"disabled >BREAKFAST</Nav.Link>
            </Nav.Item>

            <Nav.Item as="li" className="footer-category" >
                <Nav.Link href="" className="footer-category" disabled>BRUNCH</Nav.Link>
            </Nav.Item>
            <Nav.Item as="li" className="footer-category">
                <Nav.Link href="" className="footer-category" disabled>LUNCH</Nav.Link>
            </Nav.Item>
            <Nav.Item as="li" className="footer-category">
                <Nav.Link href="" className="footer-category" disabled>DINNER</Nav.Link>
            </Nav.Item>
        </Nav>
     
        

      <div className="copyright">
          <span>Baby's Food Place</span> <br />
          <span>copyright © 2021</span>
      </div>
      </Container>
  </Navbar>
  
    )
}
export default Footer;