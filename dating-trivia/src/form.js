  
import React, {Component} from 'react';
import logo from './logo.png'; // import the background image
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import DoubleSlider from './doubleSlider';
import Slider from './slider';


export default class Formj extends Component {
  constructor(props) {
    super(props)
    }
  
    render() {
     // const element = (<img src={logo} class ="logo" alt="logo" /> ) 
      
      return (
      <div>
        <div class="container">
          <img src={logo} class ="logo" alt="logo" />
          <div class="centered">Vino</div>
          <div class="centered-down">Meet. Play. Chat.</div>
        </div>
        <div class="form-part">

        <form>
        <label>
          My name is
          <input type="text" name="name" />
        </label>
        
        <label>
          I Identify as 
          <select name="gender">
            <option selected>select</option>
            <option value="man">male</option>
            <option value="women">female</option>
            <option value="transgender">transgender</option>
            <option value="non-binary">non-binary</option>
            <option value="other">other</option>

         </select>
        </label>

        <label>
          I'm looking for
          <select name="gender">
            <option selected>select</option>
            <option value="man">male</option>
            <option value="women">female</option>
            <option value="transgender">transgender</option>
            <option value="non-binary">other</option>
            <option value="other">other</option>

         </select>
        </label>
        <label>
          My age is 
          <Slider/>
        </label>
        <label>
           My preferred age range
          <DoubleSlider/>
        </label>
      </form>
      </div>
      </div>

      
      );
    }
  }