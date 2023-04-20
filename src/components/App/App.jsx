import { Component } from 'react';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { GeneralWrap } from './App.styled';
import { Searchbar } from '../Searchbar/Searchbar';

export class App extends Component {
  state = {
    qwery: '',
  };

  createQwery = qwery => {
    this.setState({ qwery });
  };
  render() {
    return (
      <GeneralWrap>
        <Searchbar onSubmit={this.createQwery} />
        <ImageGallery qwery={this.state.qwery} />
      </GeneralWrap>
    );
  }
}
