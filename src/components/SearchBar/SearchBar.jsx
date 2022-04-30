import { useState } from 'react';
import s from './Searchbar.module.css';
import PropTypes from 'prop-types';

export default function SearchBar({ onSubmit }) {
  const [request, setRequest] = useState('');

  const handleChange = e => {
    setRequest(e.currentTarget.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(request.toLowerCase());
  };

  return (
    <>
      <header className={s.Searchbar}>
        <form onSubmit={handleSubmit} className={s.SearchForm}>
          <button type="submit" className={s.SearchFormButton}>
            <span className={s.SearchFormButtonLabel}></span>
          </button>

          <label>
            <input
              type="text"
              autoComplete="off"
              name="request"
              value={request}
              onChange={handleChange}
              autoFocus
              placeholder="Search images and photos"
              className={s.SearchFormInput}
              required
            />
          </label>
        </form>
      </header>
    </>
  );
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
