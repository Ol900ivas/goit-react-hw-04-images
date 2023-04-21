import { useState } from 'react';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { GeneralWrap } from './App.styled';
import { Searchbar } from '../Searchbar/Searchbar';

export const App = () => {
  const [query, setQuery] = useState('');

  return (
    <GeneralWrap>
      <Searchbar onSubmit={setQuery} />
      <ImageGallery query={query} />
    </GeneralWrap>
  );
};
