import PropTypes from 'prop-types';

import { Formik } from 'formik';
import { Header, SearchForm, SearchFormBtn, Input } from './Searchbar.styled';
import { BsSearch } from 'react-icons/bs';

const initialValues = {
  qwery: '',
};

export const Searchbar = ({ onSubmit }) => {
  const handleSubmit = (values, { resetForm }) => {
    console.log(values);
    onSubmit(values.qwery);
    // resetForm();
  };
  return (
    <>
      <Header>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          <SearchForm>
            <SearchFormBtn type="submit">
              <BsSearch />
              {/* <Span>Search</Span> */}
            </SearchFormBtn>

            <Input
              type="text"
              name="qwery"
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
