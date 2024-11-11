import style from './LoadMore.module.css';

export default function LoadMore({ onLoad }) {
  return (
    <div className={style.btn}>
      <button type="button" onClick={onLoad}>
        Load More
      </button>
    </div>
  );
}
