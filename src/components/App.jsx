import './App.css';
import Header from '../components/header/Header';
import ImageGallery from '../components/imageGallery/ImageGallery';
import LoadMore from '../components/LoadMore/LoadMore';
import Loader from '../components/Loader/Loader';
import getPhotos from '../apiServices/photos';
import { useState, useEffect } from 'react';

function App() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [totalImages, setTotalImages] = useState(0);
  const perPage = 10;

  useEffect(() => {
    if (!query) return;

    const fetchImages = async () => {
      setLoading(true);

      try {
        const { results, total } = await getPhotos(query, page, perPage);
        setImages(prevImages => [...prevImages, ...results]);
        setTotalImages(total);
        setIsVisible(page * perPage < total); // Ensure the button is visible only if more images are available
      } catch (error) {
        setError('Something went wrong while fetching images.');
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
    setIsVisible(false);
  };

  const handleLoad = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div className="container">
      <Header onSubmit={handleSubmit} />
      {images.length < 0 && <div className="OOPS">Let’s begin search 🔎</div>}
      {loading && <Loader />}

      {images.length > 0 ? (
        <>
          <ImageGallery images={images} />
          {loading && <Loader />}
          {isVisible && !loading && <LoadMore onLoad={handleLoad} />}
        </>
      ) : (
        <div>
          {query &&
            images.length < 0 &&
            'No images found. Try a different search.'}
        </div>
      )}

      {error && <div>{error}</div>}
    </div>
  );
}

export default App;
