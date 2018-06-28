import React, { Component } from 'react';
import ExampleReCaptcha from './ExampleReCaptcha';
import { loadReCaptcha } from '../src';

class Example extends Component {

  componentDidMount() {
    loadRecaptcha('your_site_key');
  }

  render() {
    const captchaKey = 'your_key';

    return (
      <div className="Example">
        <ExampleReCaptcha/>
        <header>
          <h1>Thanks for using `react-recaptcha-google`</h1>
        </header>
      </div>
    );
  }
}

export default Example;
