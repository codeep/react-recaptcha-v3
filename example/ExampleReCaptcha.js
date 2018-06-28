import React, { Component } from 'react';
import { ReCaptcha, loadReCaptcha } from './react-recaptcha-google';

class ExampleReCaptcha extends Component {

  verifyCallback = (recaptchaToken) => {
    // Here you will get the final recaptchaToken!!!
    console.log(recaptchaToken, 'verifycallback');
  }

  render() {
    return (
      <div>
        <ReCaptcha
            action='main'
            sitekey="your_site_key"
            verifyCallback={this.verifyCallback}
        />

        <h2>Google ReCaptcha with React </h2>

        <code>
          1. Add <strong>your site key</strong> in the ReCaptcha component. <br/>
          2. Check <strong>console</strong> to see the token.
        </code>
        </div>
    );
  };
};

export default ExampleReCaptcha;
