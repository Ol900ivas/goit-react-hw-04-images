import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import { Loader } from '../Loader/Loader';
import { getData } from 'servises/fetch';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { Gallery } from './ImageGallery.styled';
import { Modal } from '../Modal/Modal';
import { LoadMoreBtn } from '../Button/Button';
import toast, { Toaster } from 'react-hot-toast';

export const ImageGallery = ({ query }) => {
  const [images, setImages] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [page, setPage] = useState(1);
  const [showLoadMoreBtn, setShowLoadMoreBtn] = useState(false);

  //==== Якщо новий запрос ====
  useEffect(() => {
    setPage(1);
    if (query) {
      // setPage(1);
      setShowLoadMoreBtn(false);
      setImages(null);
      setLoading(true);
      getData(query, 1)
        .then(data => {
          const imgSet = data.hits.map(
            ({ id, webformatURL, largeImageURL }) => ({
              id,
              webformatURL,
              largeImageURL,
            })
          );

          if (data.totalHits === 0) {
            setLoading(false);
            setShowLoadMoreBtn(false);
            return toast.error(
              'Sorry, there are no images matching your search query. Please try again.'
            );
          }
          if (data.totalHits <= 12) {
            setLoading(false);
            setImages(imgSet);
            setShowLoadMoreBtn(false);
            // setPage(1);

            return toast.success("You've reached the end of search results.");
          }
          if (data.status === 'error') {
            setLoading(false);
            // setError(true); //???========================
            return Promise.reject(data.message);
          }
          setImages(imgSet);
          setLoading(false);
          // setPage(1);
          setShowLoadMoreBtn(true);

          console.log('totalHits', data.totalHits);
        })
        .catch(error => {
          setLoading(false);
          // setError(true); //???==========================
          return toast.error(
            'ERROR. Sorry, something goes wrong. Please try again.'
          );
        });
    }
  }, [query]);

  //==== Якщо змінилася сторінка ====
  useEffect(() => {
    // const newQuery = query.trim();

    if (page !== 1) {
      setLoading(true);
      setShowLoadMoreBtn(false);

      getData(query, page).then(data => {
        const imgSet = data.hits.map(({ id, webformatURL, largeImageURL }) => ({
          id,
          webformatURL,
          largeImageURL,
        }));

        //Розрахунок загальної кількості сторінок
        const totalPages = Math.ceil(data.totalHits / 12);
        console.log('totalPages', totalPages);
        if (page === totalPages) {
          setImages(prevImages => [...prevImages, ...imgSet]);
          setLoading(false);
          setShowLoadMoreBtn(false);

          return toast.success("You've reached the end of search results.");
        }
        setImages(prevImages => [...prevImages, ...imgSet]);
        setLoading(false);
        setShowLoadMoreBtn(true);
      });
    }
  }, [page, query]);

  const closeModal = () => {
    setShowModal(false);
  };

  const onImgClick = e => {
    setLargeImageURL(e.target.alt);
    setShowModal(true);
  };

  const onLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <>
      <div>
        <Toaster />
      </div>
      {showModal && (
        <Modal onClose={closeModal}>
          <img src={largeImageURL} alt="Large" />
        </Modal>
      )}
      {loading && page === 1 && <Loader />}

      {images && (
        <Gallery>
          {images.map(({ id, webformatURL, largeImageURL }) => {
            return (
              <li key={id}>
                <ImageGalleryItem
                  id={id}
                  webformatURL={webformatURL}
                  largeImageURL={largeImageURL}
                  onClick={onImgClick}
                />
              </li>
            );
          })}
        </Gallery>
      )}
      {images && showLoadMoreBtn && (
        <LoadMoreBtn type="button" onClick={onLoadMore} />
      )}
      {loading && page !== 1 && <Loader />}
    </>
  );
};

ImageGallery.propTypes = {
  query: PropTypes.string.isRequired,
};

// export class ImageGallery extends Component {
//   state = {
//     images: null,
//     loading: false,
//     error: '',
//     showModal: false,
//     largeImageURL: '',
//     page: 1,
//     showLoadMoreBtn: false,
//   };

//   componentDidUpdate(prevProps, prevState) {
//     const query = this.props.query.trim();
//     const { page } = this.state;

//     //==== Якщо новий запрос ====
//     if (prevProps.query !== query && query) {
//       this.setState({
//         loading: true,
//         images: null,
//         showLoadMoreBtn: false,
//         page: 1,
//       });
//       getData(query, 1)
//         .then(data => {
//           const imgSet = data.hits.map(
//             ({ id, webformatURL, largeImageURL }) => ({
//               id,
//               webformatURL,
//               largeImageURL,
//             })
//           );

//           if (data.totalHits === 0) {
//             this.setState({ loading: false, showLoadMoreBtn: false });
//             return toast.error(
//               'Sorry, there are no images matching your search query. Please try again.'
//             );
//           }
//           if (data.totalHits <= 12) {
//             this.setState({
//               loading: false,
//               images: imgSet,
//               showLoadMoreBtn: false,
//               page: 1,
//             });
//             return toast.success("You've reached the end of search results.");
//           }
//           if (data.status === 'error') {
//             this.setState({ loading: false });
//             return Promise.reject(data.message);
//           }
//           this.setState({
//             images: imgSet,
//             loading: false,
//             page: 1,
//             showLoadMoreBtn: true,
//           });
//           console.log('totalHits', data.totalHits);
//         })
//         .catch(error => {
//           this.setState({ loading: false });
//           return toast.error(
//             'ERROR. Sorry, something goes wrong. Please try again.'
//           );
//         });
//     }

//     //==== Якщо змінилася сторінка ====
//     if (prevState.page !== page && page !== 1) {
//       this.setState({ loading: true, showLoadMoreBtn: false });

//       getData(query, page).then(data => {
//         const imgSet = data.hits.map(({ id, webformatURL, largeImageURL }) => ({
//           id,
//           webformatURL,
//           largeImageURL,
//         }));

//         //Розрахунок загальної кількості сторінок
//         const totalPages = Math.ceil(data.totalHits / 12);
//         console.log('totalPages', totalPages);
//         if (page === totalPages) {
//           this.setState({ loading: false, showLoadMoreBtn: false });
//           this.setState(prevState => ({
//             images: [...prevState.images, ...imgSet],
//           }));
//           return toast.success("You've reached the end of search results.");
//         }
//         this.setState({ loading: false, showLoadMoreBtn: true });
//         this.setState(prevState => ({
//           images: [...prevState.images, ...imgSet],
//         }));
//       });
//     }
//   }

//   closeModal = () => {
//     this.setState({ showModal: false });
//   };

//   onImgClick = e => {
//     this.setState({ largeImageURL: e.target.alt, showModal: true });
//   };

//   onLoadMore = () => {
//     this.setState(prevState => ({ page: prevState.page + 1 }));
//   };

//   render() {
//     const { images, showModal, largeImageURL, loading, showLoadMoreBtn, page } =
//       this.state;

//     return (
//       <>
//         <div>
//           <Toaster />
//         </div>
//         {showModal && (
//           <Modal onClose={this.closeModal}>
//             <img src={largeImageURL} alt="Large" />
//           </Modal>
//         )}
//         {loading && page === 1 && <Loader />}

//         {images && (
//           <Gallery>
//             {images.map(({ id, webformatURL, largeImageURL }) => {
//               return (
//                 <li key={id}>
//                   <ImageGalleryItem
//                     id={id}
//                     webformatURL={webformatURL}
//                     largeImageURL={largeImageURL}
//                     onClick={this.onImgClick}
//                   />
//                 </li>
//               );
//             })}
//           </Gallery>
//         )}
//         {images && showLoadMoreBtn && (
//           <LoadMoreBtn type="button" onClick={this.onLoadMore} />
//         )}
//         {loading && page !== 1 && <Loader />}
//       </>
//     );
//   }
// }
