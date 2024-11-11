import { useState } from 'react';
import { IoMdSearch } from 'react-icons/io';
import style from './Header.module.css';
import toast from 'react-hot-toast';

export default function Header({ onSubmit }) {
  const [query, setQuery] = useState('');

  const handleChange = e => {
    setQuery(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (!query.trim()) {
      toast('Please enter a search query!', {
        duration: 4000,
        position: 'top-center',
      });
      return;
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
        />
        <button type="submit" className={style.button}>
          <IoMdSearch />
        </button>
      </form>
    </header>
  );
}
