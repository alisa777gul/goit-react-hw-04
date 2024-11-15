import { useState } from 'react';
import { IoMdSearch } from 'react-icons/io';
import style from './SearchBar.module.css';
import toast from 'react-hot-toast';

export default function SearchBar({ onSubmit }) {
  const [query, setQuery] = useState('');

  const handleChange = e => {
    setQuery(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log('Submit handler triggered');
    if (!query.trim()) {
      console.log('no entry');
      return toast.error('Please enter a search query!', {
        duration: 4000,
        position: 'top-right',
      });
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
