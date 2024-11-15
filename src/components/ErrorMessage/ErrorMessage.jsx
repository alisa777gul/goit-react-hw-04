import style from './ErrorMessage.module.css';
import { toast } from 'react-hot-toast';

export default function ErrorMessage() {
  toast.error('Something went wrong 😞', {
    duration: 4000,
    position: 'top-right',
  });
  return <div className={style.messageBox}>Something went wrong 😞</div>;
}
