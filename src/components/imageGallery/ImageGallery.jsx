import ImageCard from '../ImageCard/ImageCard';
import style from './ImageGallery.module.css';

export default function ImageGallery({ images }) {
  return (
    <ul className={style.list}>
      {images.map(({ instagram_username, urls, id }) => (
        <li key={id} className={style.elem}>
          <ImageCard
            instagram_username={instagram_username}
            urls={urls}
            id={id}
          />
        </li>
      ))}
    </ul>
  );
}
