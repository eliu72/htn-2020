import React, {Component} from 'react';
import logo from './logo.png'; // import the background image
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


export default class Formj extends Component {
  constructor(props) {
    super(props)
    }
  
    render() {
      const element = (<img src={logo} class ="logo" alt="logo" />)
      
      return (
      <div>
        {element}
        {this.props.img}
        <div class="form-part">

        <form>
        <label>
          My name is
          <input type="text" name="name" />
        </label>
        
        <label>
          I Identify as 
          <select name="animal">
            <option value="male">male</option>
            <option value="female">female</option>
            <option value="transgender">transgender</option>
            <option value="transgender">other</option>

         </select>
        </label>

        <label>
          I'm looking for
          <input type="text" name="name" />
        </label>
        <label>
          My age is 
          <input type="text" name="name" />
        </label>
      </form>
      </div>
      </div>

      
      );
    }
  }

