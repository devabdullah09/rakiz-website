import React from 'react';
import { ContactUs } from 'src/sections';

function ContactUsPage(props) {
    return (
      <div
        style={{
          // render contact us section in the middle of the page
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ContactUs />
      </div>
    );
}

export default ContactUsPage;