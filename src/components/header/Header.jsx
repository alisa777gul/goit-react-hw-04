import { useState } from 'react';
import { IoMdSearch } from 'react-icons/io';
import style from './Header.module.css';

export default function Header({ onSubmit }) {
  const [query, setQuery] = useState('');
  const handleChange = e => {
    setQuery(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!query.trim()) {
      return alert('is empty');
    }
    onSubmit(query);
    setQuery('');
  };

  return (
    <header className={style.header}>
      <form onSubmit={handleSubmit} className={style.form}>
        <input
          className={style.input}
          type="text"
          autoComplete="off"
          placeholder="Search photos..."
          required
          name="search"
          autoFocus
          value={query}
          onChange={handleChange}
        ></input>{' '}
        <button type="submit" className={style.button}>
          <IoMdSearch />
        </button>
      </form>
    </header>
  );
}
