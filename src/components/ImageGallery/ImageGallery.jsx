import PropTypes from 'prop-types';
import { useState } from 'react';

import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { Gallery } from './ImageGallery.styled';
import { Modal } from '../Modal/Modal';

export const ImageGallery = ({ images }) => {
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');

  const closeModal = () => {
    setShowModal(false);
  };

  const onImgClick = e => {
    setLargeImageURL(e.target.alt);
    setShowModal(true);
  };

  return (
    <>
      {showModal && (
        <Modal onClose={closeModal}>
          <img src={largeImageURL} alt="Large" />
        </Modal>
      )}

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
    </>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
};
