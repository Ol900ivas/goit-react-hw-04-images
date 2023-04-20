import PropTypes from 'prop-types';
import { ItemWrap, Img } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({
  id,
  webformatURL,
  largeImageURL,
  onClick,
}) => {
  return (
    <ItemWrap>
      <Img src={webformatURL} alt={largeImageURL} id={id} onClick={onClick} />
    </ItemWrap>
  );
};

ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
