import style from './LoadMore.module.css';

export default function LoadMore({ onLoad }) {
  return (
    <div className={style.btnDiv}>
      <button className={style.btn} type="button" onClick={onLoad}>
        Load More
      </button>
    </div>
  );
}
