import ImageCard from '../ImageCard/ImageCard';
import style from './ImageGallery.module.css';

export default function ImageGallery({ images, openModal }) {
  return (
    <ul className={style.list}>
      {images.map(image => (
        <li
          key={image.id}
          className={style.elem}
          onClick={() => openModal(image)}
        >
          <ImageCard
            alt_description={image.alt_description}
            urls={image.urls}
            id={image.id}
          />
        </li>
      ))}
    </ul>
  );
}
