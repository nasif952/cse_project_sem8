import React from 'react';
import { MDBFooter, MDBContainer, MDBIcon } from 'mdb-react-ui-kit';
import './Footer.css';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faYoutube,
    faFacebook,
    faTwitter,
    faInstagram
  } from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <div className="app-container">
      <MDBFooter className='text-center' color='white' bgColor='dark'>
        <MDBContainer className='p-4'>
          {/* Social Icons Section */}
          <section className='mb-4'>
            <MDBIcon fab icon='facebook-f' className='m-1' />
            <MDBIcon fab icon='twitter' className='m-1' />
            <MDBIcon fab icon='google' className='m-1' />
            <MDBIcon fab icon='instagram' className='m-1' />
            <MDBIcon fab icon='linkedin-in' className='m-1' />
            <MDBIcon fab icon='github' className='m-1' />
          </section>

          {/* Welcome Message Section */}
          <section className='mb-4'>
            <p>
              Hello There! Welcome to our PC Builder and Guideline Project. Feel free to explore our proposed PC building guide or customize your PC for approximate prices.
            </p>
          </section>

          {/* Contact Me Section */}
          <section id="contact">
            <div className="Contact_f">
              <div className="Contact_container">
                <div className="row">
                  <div className="contact-left">
                    <h1 className="hobbies-sub-title">Contact Me</h1>
                    <p><i className="fas fa-paper-plane"></i> nasif.ahmed95@gmail.com</p>
                    <p><i className="fas fa-phone-volume"></i> 01757458800</p>
                    {/* Social Icons (Updated with React event handling) */}
                    <div className="social-icons">
                    <a href="https://www.youtube.com/channel/UCuoIL8UGmDTw5vlf4gOBnJQ"
        className="youtube social">
        <FontAwesomeIcon icon={faYoutube} size="2x" />
      </a>
      <a href="https://www.facebook.com/nasifahmednongor/"
        className="facebook social">
        <FontAwesomeIcon icon={faFacebook} size="2x" />
      </a>

                    
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </MDBContainer>

        {/* Footer Text Section */}
        <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
          © 2024 Copyright:
          <a className='text-white' href=''>
            Nasif Ahmed Nafi
          </a>

        </div>
      </MDBFooter>
      
    </div>
  );
}
