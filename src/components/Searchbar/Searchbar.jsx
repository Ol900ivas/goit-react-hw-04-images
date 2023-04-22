import PropTypes from 'prop-types';
import toast, { Toaster } from 'react-hot-toast';

import { Formik } from 'formik';
import { Header, SearchForm, SearchFormBtn, Input } from './Searchbar.styled';
import { BsSearch } from 'react-icons/bs';

const initialValues = {
  query: '',
};

export const Searchbar = ({ onSubmit }) => {
  const handleSubmit = (values, actions) => {
    if (values.query.trim() === '') {
      toast('Enter your query, please');
      return;
    }
    console.log(values.query);
    onSubmit(values.query.trim());

    // actions.resetForm();
  };

  return (
    <>
      <Header>
        <div>
          <Toaster />
        </div>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          <SearchForm>
            <SearchFormBtn type="submit">
              <BsSearch />
              {/* <Span>Search</Span> */}
            </SearchFormBtn>

            <Input
              type="text"
              name="query"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
            />
          </SearchForm>
        </Formik>
      </Header>
    </>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
