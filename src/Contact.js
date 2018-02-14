import React from 'react';
import EditContactForm from './EditContactForm';

const ContactDetail = (props) => (
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
);

class Contact extends React.Component {
  state = {
    requesting: false,
    editing: false, // indicates whether a contact is being edited or not
  };

  toggleEditing = () => {
    const editing = this.state.editing;
    this.setState({ editing: !editing });
  };

  render() {
    const props = this.props;
    const { requesting, editing } = this.state;

    return (
      <div className="contact">
        <div className="contact-action">
          <button onClick={this.toggleEditing}>{editing ? 'Cancel' : 'Edit'}</button>
          <button
            disabled={editing || requesting}
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
        </div>

        <div className="contact__photo">
          <img src={props.photo} alt={props.name} />
        </div>
        {editing 
          ? (
            <EditContactForm
              id={props.id}
              name={props.name}
              phone={props.phone}
              onSubmitted={(data) => {
                return this.props.onContactUpdate(data)
                  .then(() => {
                    this.setState({ editing: false });
                  });
              }}
            />
          )
          : <ContactDetail name={props.name} phone={props.phone} />
        }
      </div>
    );
  }
}
export default Contact;