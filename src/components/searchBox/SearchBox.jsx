import style from './SearchBox.module.css';

export default function SearchBox({ value, onFilter }) {
  return (
    <div className={style.box}>
      <p className={style.name}>Find contacts by name</p>
      <input
        type="text"
        value={value}
        onChange={e => onFilter(e.target.value)}
        className={style.input}
      />
    </div>
  );
}
