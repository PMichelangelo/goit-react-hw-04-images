import { useState, useRef, useEffect } from 'react';
//import { Component } from 'react';
import styles from './searchbar.module.css';

const Searchbar = ({ onSubmit }) => {
  const [search, setSearch] = useState('');

  const inputRef = useRef(null);

  useEffect(() => {
    console.log(inputRef);
    inputRef.current.focus();
  }, []);

  const handleChange = e => {
    const { value } = e.target;
    setSearch(value);
  };

  const handleSubmit = e => {
    console.log(`Searchbar ${search}`);
    e.preventDefault();
    onSubmit(search);
    setSearch('');
  };

  return (
    <header className={styles.searchbar}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <button type="submit" className={styles.searchFormButton}>
          <span className={styles.searchFormButtonLabel}>Search</span>
        </button>

        <input
          ref={inputRef}
          value={search}
          onChange={handleChange}
          className={styles.searchForm}
          name="search"
          type="text"
          required
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

/*
class Searchbar extends Component {
  state = {
    search: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit({ ...this.state });
    this.setState({
      search: '',
    });
  };

  render() {
    const { handleChange, handleSubmit } = this;
    const { search } = this.state;
    return (
      <header className={styles.searchbar}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <button type="submit" className={styles.button}>
            <span className={styles.buttonLabel}>Search</span>
          </button>

          <input
            value={search}
            onChange={handleChange}
            className={styles.input}
            name="search"
            type="text"
            required
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
*/
export default Searchbar;
