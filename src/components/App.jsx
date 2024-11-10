import './App.css';
import { useState } from 'react';
import SearchBox from '../components/searchBox/SearchBox';
import ContactList from '../components/contactList/ContactList';
import ContactForm from '../components/contactForm/ContactForm';

function App() {
  const exampleContacts = [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ];

  const [contacts, setContacts] = useState(() => {
    const savedContacts = localStorage.getItem('contacts');
    return savedContacts ? JSON.parse(savedContacts) : exampleContacts;
  });
  const [value, setValue] = useState('');

  const addContact = newContact => {
    setContacts(prevContacts => {
      const updatedContacts = [...prevContacts, newContact];
      localStorage.setItem('contacts', JSON.stringify(updatedContacts));
      return updatedContacts;
    });
  };

  const deleteTask = taskId => {
    setContacts(prevContacts => {
      const updatedContacts = prevContacts.filter(
        contact => contact.id !== taskId
      );
      localStorage.setItem('contacts', JSON.stringify(updatedContacts));
      return updatedContacts;
    });
  };

  const visibleContacts = contacts.filter(contact =>
    contact.name.toLocaleLowerCase().includes(value.toLocaleLowerCase())
  );

  console.log(contacts);

  return (
    <div className="container">
      <h1>Phonebook</h1>
      <ContactForm onAdd={addContact} />
      <SearchBox value={value} onFilter={setValue} />
      <ContactList contacts={visibleContacts} onDelete={deleteTask} />
    </div>
  );
}

export default App;
