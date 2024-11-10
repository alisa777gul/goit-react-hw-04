import styles from './Contact.module.css';
import { IoPerson } from 'react-icons/io5';
import { IoCall } from 'react-icons/io5';

export default function Contact({ data: { id, name, number }, onDelete }) {
  return (
    <div className={styles.box}>
      <div>
        <p className={styles.name}>
          <IoPerson className={styles.icon} />
          {name}
        </p>
        <p className={styles.number}>
          {' '}
          <IoCall className={styles.icon} />
          {number}
        </p>
      </div>
      <button className={styles.btn} onClick={() => onDelete(id)}>
        Delete
      </button>
    </div>
  );
}
