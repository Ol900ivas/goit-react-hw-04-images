import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import { GeneralWrap } from './App.styled';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Searchbar } from '../Searchbar/Searchbar';
import { Loader } from '../Loader/Loader';
import { LoadMoreBtn } from '../Button/Button';

import { getData } from 'servises/fetch';

export const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [showLoadMoreBtn, setShowLoadMoreBtn] = useState(false);

  useEffect(() => {
    if (query === '') {
      return;
    }
    setLoading(true);
    setShowLoadMoreBtn(false);
    getImg();
    async function getImg() {
      try {
        const data = await getData(query, page);
        const totalPages = Math.ceil(data.totalHits / 12);

        console.log('totalPages', totalPages);
        console.log('totalHits', data.totalHits);

        const imgSet = data.hits.map(({ id, webformatURL, largeImageURL }) => ({
          id,
          webformatURL,
          largeImageURL,
        }));

        if (data.totalHits === 0) {
          setLoading(false);
          setShowLoadMoreBtn(false);
          return toast.error(
            `Sorry, there are no images matching your search query '${query}' . Please try again.`
          );
        }
        if (data.totalHits <= 12) {
          setLoading(false);
          setImages(imgSet);
          setShowLoadMoreBtn(false);
          return toast.success(
            `You've reached the end of search results '${query}'.`
          );
        }
        if (page === totalPages) {
          setLoading(false);
          setImages(prevImages => [...prevImages, ...imgSet]);
          setShowLoadMoreBtn(false);
          return toast.success(
            `You've reached the end of search results '${query}'.`
          );
        }
        if (page === 1) {
          setImages(imgSet);
        } else if (page !== totalPages) {
          setImages(prevImages => [...prevImages, ...imgSet]);
        }

        setLoading(false);
        setShowLoadMoreBtn(true);
      } catch (error) {
        this.setState({ loading: false });
        return toast.error(
          'ERROR. Sorry, something goes wrong. Please try again.'
        );
      }
    }
  }, [page, query]);

  const formSubmit = query => {
    setQuery(query);
    setPage(1);
    setImages([]);
  };

  const onLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <GeneralWrap>
      <div>
        <Toaster />
      </div>
      <Searchbar onSubmit={formSubmit} />
      {loading && page === 1 && <Loader />}
      <ImageGallery images={images} />
      {showLoadMoreBtn && <LoadMoreBtn type="button" onClick={onLoadMore} />}
      {loading && page !== 1 && <Loader />}
    </GeneralWrap>
  );
};
