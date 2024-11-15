import './App.css';
import SearchBar from '../components/SearchBar/SearchBar';
import ImageGallery from '../components/ImageGallery/ImageGallery';
import LoadMore from '../components/LoadMore/LoadMore';
import Loader from '../components/Loader/Loader';
import ErrorMessage from '../components/ErrorMessage/ErrorMessage';
import getPhotos from '../apiServices/photos';
import { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import ImageModal from './ImageModal/ImageModal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

function App() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [errord, setError] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const perPage = 10;

  useEffect(() => {
    if (!query) return;

    const fetchImages = async () => {
      setLoading(true);

      try {
        const { results, total } = await getPhotos(query, page, perPage);

        setImages(prevImages => [...prevImages, ...results]);
        setIsVisible(page * perPage < total);
        setIsEmpty(results.length === 0);
        // eslint-disable-next-line no-unused-vars
      } catch (error) {
        setError(true);
        setIsVisible(false);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [page, query]);

  const openModal = image => {
    setSelectedImage(image);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedImage(null);
  };

  const handleSubmit = value => {
    setQuery(value);
    setPage(1);
    setImages([]);
    setError(null);
    setIsEmpty(false);
    setIsVisible(false);
  };

  const handleLoad = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div className="container">
      <Toaster />
      <SearchBar onSubmit={handleSubmit} />
      {images.length === 0 && !loading && !query && (
        <div className="start">Let’s begin search 🔎</div>
      )}
      {isEmpty && query && !loading && (
        <div className="try">No images found. Try a different search.</div>
      )}
      {page === 1 && loading && <Loader />}
      {images.length > 0 ? (
        <>
          <ImageGallery images={images} openModal={openModal} />
          {loading && <Loader />}
          {isVisible && !loading && <LoadMore onLoad={handleLoad} />}
        </>
      ) : (
        <>{errord && <ErrorMessage />}</>
      )}
      {selectedImage && (
        <ImageModal
          image={selectedImage}
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
        />
      )}
    </div>
  );
}

export default App;
