import './App.css';
import Header from '../components/header/Header';
import ImageGallery from '../components/imageGallery/ImageGallery';
import LoadMore from '../components/LoadMore/LoadMore';
import Loader from '../components/Loader/Loader';
import ErrorMessage from '../components/ErrorMessage/ErrorMessage';
import getPhotos from '../apiServices/photos';
import { useState, useEffect } from 'react';

function App() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
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
      } catch (error) {
        setError(true);
        setIsVisible(false);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [page, query]);

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
      <Header onSubmit={handleSubmit} />

      {images.length === 0 && !loading && !query && (
        <div className="OOPS">Let’s begin search 🔎</div>
      )}

      {isEmpty && query && !loading && (
        <div className="try">No images found. Try a different search.</div>
      )}

      {page === 1 && loading && <Loader />}

      {images.length > 0 ? (
        <>
          <ImageGallery images={images} />
          {loading && <Loader />}
          {isVisible && !loading && <LoadMore onLoad={handleLoad} />}
        </>
      ) : (
        <>{error && <ErrorMessage />}</>
      )}
    </div>
  );
}
export default App;
