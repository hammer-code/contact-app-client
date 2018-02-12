import React from 'react';

class Contact extends React.Component {
  state = {
    requesting: false,
  };

  render() {
    const { props } = this
    const { requesting } = this.state

    return (
      <div className="contact">
        <button
          disabled={requesting}
          onClick={() => {
            this.setState({ requesting: true })
            
            props.onContactDelete(props.id)
              .catch(() => {
                this.setState({ requesting: false })
              })
          }}
          className="contact__remove-button"
        >
          {requesting ? 'Deleting...' : 'Delete'}
        </button>

        <div className="contact__photo">
          <img src={props.photo} alt={props.name} />
        </div>
        <div className="contact__detail">
          <div>
            <p><b>Name</b></p>
            <p>{props.name}</p>
          </div>
          <div>
            <p><b>Phone</b></p>
            <p>{props.phone}</p>
          </div>
        </div>
      </div>
    );
  }
}
export default Contact;