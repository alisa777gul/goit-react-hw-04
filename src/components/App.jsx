import './App.css';
import Header from '../components/header/Header';
import ImageGallery from '../components/imageGallery/ImageGallery';
import LoadMore from '../components/LoadMore/LoadMore';
import getPhotos from '../apiServices/photos';
import { useState, useEffect } from 'react';

function App() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const perPage = 30;

  useEffect(() => {
    if (!query) return;

    const fetchImages = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getPhotos(query, page, perPage);
        const { results, total } = data;

        setImages(prevImages =>
          page === 1 ? results : [...prevImages, ...results]
        );

        setHasMore(results.length > 0 && total > page * perPage);
      } catch (error) {
        setError('Ошибка при получении изображений');
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
    setHasMore(true);
  };

  const handleLoad = () => {
    if (!loading && hasMore) {
      setPage(prevPage => prevPage + 1);
    }
  };

  return (
    <div className="container">
      <Header onSubmit={handleSubmit} />
      <ImageGallery images={images} />
      {hasMore && !loading && <LoadMore onLoad={handleLoad} />}
      {loading && <div>Loading...</div>}
    </div>
  );
}

export default App;
