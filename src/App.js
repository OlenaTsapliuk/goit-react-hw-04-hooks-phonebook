import React, { Component } from "react";
import ContactForm from "./Components/ContactForm";
import Container from "./Components/Container";
import ContactList from "./Components/ContactList";
import Filter from "./Components/Filter";
import shortid from "shortid";
import s from "./App.module.css";

class App extends Component {
  state = {
    contacts: [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ],
    filter: "",
  };

  addContact = ({ name, number }) => {
    const { contacts } = this.state;
    const contact = {
      id: shortid.generate(),
      name,
      number,
    };

    if (contacts.find((contact) => contact.name === name)) {
      alert(`${name} is already in contacts.`);
    } else {
      this.setState((prevState) => ({
        contacts: [...prevState.contacts, contact],
      }));
    }
  };

  changeFilter = (e) => {
    this.setState({ filter: e.currentTarget.value });
  };

  getFilterContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };
  deleteContact = (contactId) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter(
        (contact) => contact.id !== contactId
      ),
    }));
  };

  componentDidUpdate(prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  }
  }

  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem('contacts'));
    if (contacts) {
      this.setState({ contacts: contacts });
    }

    
  }

  render() {
    const { filter } = this.state;
    const filterContacts = this.getFilterContacts();

    return (
      <Container>
        <h1 className={s.title}>Phonebook</h1>
        <ContactForm onSubmit={this.addContact} state={this.state} />
        <h2 className={s.title}>Contacts</h2>
        <Filter value={filter} onChange={this.changeFilter} />
        <ContactList
          contacts={filterContacts}
          onDeleteContact={this.deleteContact}
        />
      </Container>
    );
  }
}
export default App;
