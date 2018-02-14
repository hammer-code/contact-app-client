import React, { Component } from 'react';
import Contact from './Contact';
import AddContactForm from './AddContactForm'

const API_URL = 'https://contact-app-server.herokuapp.com';

class App extends Component {
  state = {
    fetching: false,
    contacts: [],
    page: 0,
  };

  componentDidMount() {
    this.fetchContacts();
  } 

  fetchContacts = (page = 1) => {
    const { contacts } = this.state;

    this.setState({ fetching: true });

    fetch(`${API_URL}/contacts?page=${page}`)
      .then(response => response.json())
      .then((data) => {
        
        this.setState({
          contacts: contacts.concat(data.result),
          fetching: false,
          page: data.page,
          hasNextPage: !!data.nextPage,
        });

      })
      .catch(() => {
        this.setState({ fetching: false });
      });
  }

  loadMore = () => {
    const { hasNextPage, page } = this.state;

    if (hasNextPage) {
      this.fetchContacts(page + 1);
    } 
  }
  
  postNewContact = (contactData) => {
    const headers = new Headers()

    headers.append('Content-Type', 'application/json')

    return fetch(`${API_URL}/contacts`, {
      method: 'POST',
      headers,
      body: JSON.stringify(contactData)
    })
      .then((response) => response.json())
      .then(newContact => {
        const currentContacts = this.state.contacts;

        this.setState({
          contacts: [newContact, ...currentContacts],
        })
      })
  }

  destroyContact = (contactId) => {
    return fetch(`${API_URL}/contacts/${contactId}`, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(data => {
        const { contacts } = this.state
        this.setState({
          contacts: contacts.filter(contact => contact.id !== contactId)
        })
      })
  };

  updateContact = (data) => {
    const { contacts } =  this.state;

    const headers = new Headers();

    headers.append('Content-Type', 'application/json');

    return fetch(`${API_URL}/contacts/${data.id}`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then((updatedContact) => {
        const updatedContacts = contacts.map((contact) => {
          if (contact.id === data.id) {
            return updatedContact;
          }
          
          return contact;
        });

        this.setState({ contacts: updatedContacts })
      })
  };
  
  render() {
    const {
      contacts,
      fetching,
      hasNextPage,
    } = this.state;
    const hasContacts = !!contacts.length;
    const fetchingOrNoMorePage = fetching || !hasNextPage;

    return (
      <div className="app">
        <h1>Contact App</h1>
        
        <AddContactForm onFormSubmitted={this.postNewContact} />
        
        {contacts.map((contact) => (
          <Contact 
            key={contact.id}
            id={contact.id}
            name={contact.name}
            phone={contact.phone}
            photo={contact.photo}
            onContactDelete={this.destroyContact}
            onContactUpdate={this.updateContact}
          />
        ))}
        
        {!hasContacts && !fetching ? <div>No contacts yet</div> : null}

        <div style={{ textAlign: 'center' }}>
          {fetching 
            ? <span>Loading...</span>
            : null
          }
          {fetchingOrNoMorePage
            ? null
            : <button onClick={this.loadMore}>Load More</button>
          }
        </div>
      </div>
    );
  }
}

export default App;
