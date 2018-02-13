import React, { Component } from 'react'

class EditContactForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: props.name,
      phone: props.phone,
    }
  }

  updateInput = (fieldName) => (event) => {
    const value = event.target.value

    this.setState({ [fieldName]: value })
  }

  handleFormSubmit = (event) => {
    event.preventDefault();

    const { name, phone } = this.state;
    const { id } = this.props;
    
    const data = { id, name, phone };

    this.props.onSubmitted(data);
  }
  
  render() {

    const { name, phone  } = this.state;

    return (
      <form onSubmit={this.handleFormSubmit} className="edit-contact-form">
        <div className="input-group">
          <label>Name</label>
          <input className="form-control" onChange={this.updateInput('name')} name="name" value={name} />
        </div>
        <div className="input-group">
          <label>Phone</label>
          <input className="form-control" onChange={this.updateInput('phone')} name="phone" value={phone} />
        </div>
        <button type="submit">Update</button>
      </form>
    );
  }
}

export default EditContactForm;
