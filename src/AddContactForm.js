import React from 'react';

class AddContactForm extends React.Component {
  state = { submitting: false }

  render() {
    const { submitting } = this.state;

    return (
      <form className="add-contact-form" onSubmit={(event) => {
        event.preventDefault();
        this.setState({ submitting: true })

        const form = event.target;
        
        const name = form.name.value
        const phone = form.phone.value
        
        const data = { name, phone }
        
        this.props.onFormSubmitted(data)
          .then(() => {
            this.setState({ submitting: false })
          })
          .catch(() => {
            this.setState({ submitting: false })
          })

        form.reset()
      }}>
        <div className="input-group">
          <input type="text" name="name" className="form-control" placeholder="Contact name" />
        </div>

        <div className="input-group">
          <input type="text" name="phone" className="form-control" placeholder="Contact phone" />
        </div>

        <button type="submit" disabled={submitting}>{submitting ? 'Sending...' : 'Add'}</button>
      </form>
    );
  }
}

export default AddContactForm;