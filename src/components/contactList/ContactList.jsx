import Contact from '../contact/Contact';
import styles from './ContactList.module.css';

export default function ContactList({ contacts, onDelete }) {
  return (
    <ul className={styles.list}>
      {contacts.map(contact => (
        <li key={contact.id} className={styles.element}>
          <Contact data={contact} onDelete={onDelete} />
        </li>
      ))}
    </ul>
  );
}
