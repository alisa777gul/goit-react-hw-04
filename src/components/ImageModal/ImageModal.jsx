import stylef from './ImageModal.module.css';
import Modal from 'react-modal';
import { FcLike } from 'react-icons/fc';
import { MdPerson } from 'react-icons/md';
import { CiCalendarDate } from 'react-icons/ci';

export default function ImageModal({ image, isOpen, onRequestClose, style }) {
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={style}>
      <div className={stylef.wrapper}>
        <div className={stylef.modal}>
          <img src={image.urls.regular} alt={image.alt_description} />
          <ul className={stylef.list}>
            <li>
              <p>
                <MdPerson /> Author: {image.user.name}
              </p>
            </li>
            <li>
              <p>
                <CiCalendarDate /> Added: {image.created_at.slice(0, 10)}
              </p>
            </li>
            <li>
              <p>
                <FcLike /> Likes: {image.likes}
              </p>
            </li>
          </ul>
        </div>
      </div>
    </Modal>
  );
}
