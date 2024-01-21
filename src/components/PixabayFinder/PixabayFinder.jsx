import { useState, useEffect, useRef } from 'react';
import Searchbar from 'components/Searchbar/Searchbar';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import { searchResults } from 'components/api/api';
import Button from 'components/Button/Button';
import Modal from 'components/Modal/Modal';
import Loader from 'components/Loader/Loader';
import styles from './pixabayFinder.module.css';

const PixabayFinder = () => {
  const [search, setSearch] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState(false);
  const [imageModal, setimageModal] = useState({});
  const prevSearchRef = useRef('');

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        const { data } = await searchResults(search, page);

        if (data.hits && data.hits.length > 0) {
          console.log('Fetched images:', data.hits);
          setImages(prevImages => [...prevImages, ...data.hits]);
        } else {
          alert('Your query is invalid');
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    if (search && search !== prevSearchRef.current) {
      console.log(`PrevSearch: ${prevSearchRef.current}`);
      fetchImages();
      prevSearchRef.current = search;
    }
  }, [search, page]);

  const handleSearch = search => {
    if (search === prevSearchRef.current) {
      return alert(`You alredy get results of ${search}! Try something else.`);
    }
    console.log('Submitted:', search);
    setSearch(search);
    setImages([]);
    setPage(1);
  };

  const loadMore = () => {
    setPage(prevPage => {
      console.log('prevPage:', prevPage);
      console.log('page before update:', page);
      const updatedPage = prevPage + 1;
      console.log('page after update:', updatedPage);
      return updatedPage;
    });
  };

  const showModal = largeImageURL => {
    setModal(true);
    setimageModal({ largeImageURL });
  };

  const closeModal = () => {
    setModal(false);
    setimageModal({});
  };

  const isImages = Boolean(images.length);
  return (
    <>
      <Searchbar onSubmit={handleSearch} />
      {error && <p className={styles.error}>{error}</p>}
      {loading && <Loader />}
      {isImages && <ImageGallery items={images} showModal={showModal} />}
      {isImages && (
        <div className={styles.btnWrapper}>
          <Button onClick={loadMore} type="button">
            Load more
          </Button>
        </div>
      )}
      {modal && (
        <Modal largeImageURL={imageModal.largeImageURL} close={closeModal} />
      )}
    </>
  );
};
/*
class PixabayFinder extends Component {
  state = {
    search: '',
    images: [],
    loading: false,
    error: null,
    page: 1,
    modalOpen: false,
    imageModal: {},
  };

  async componentDidUpdate(preProps, prevState) {
    if (
      prevState.search !== this.state.search ||
      prevState.page !== this.state.page
    ) {
      this.fetchImages();
    }
    // const { search, page } = this.state;
    // if (search && (search !== prevState.search || page !== prevState.page)) {
    //   this.fetchImages();
    // }
  }

  async fetchImages() {
    const { search, page } = this.state;
    try {
      this.setState({
        loading: true,
      });
      const { data } = await searchResults(search, page);

      if (data.hits && data.hits.length > 0) {
        this.setState(({ images }) => ({
          images: [...images, ...data.hits],
        }));
      } else {
        alert('Your query is invalid');
      }

      //images: data.hits ? data.hits : [],}
      console.log(this.state);
    } catch (error) {
      this.setState({
        error: error.message,
      });
    } finally {
      this.setState({
        loading: false,
      });
    }
  }

  handleSearch = ({ search }) => {
    if (this.state.search === search) {
      return alert(`You alredy get results of ${search}! Try something else.`);
    }
    this.setState({
      search,
      images: [],
      page: 1,
    });
  };

  loadMore = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  showModal = largeImageURL => {
    this.setState({
      modalOpen: true,
      imageModal: {
        largeImageURL,
      },
    });
  };

  closeModal = () => {
    this.setState({
      modalOpen: false,
      imageModal: {},
    });
  };

  render() {
    const { handleSearch, loadMore, showModal, closeModal } = this;
    const { images, loading, error, modalOpen, imageModal } = this.state;
    const isImages = Boolean(images.length);
    return (
      <>
        <Searchbar onSubmit={handleSearch} />
        {error && <p className={styles.error}>{error}</p>}
        {loading && <Loader />}
        {isImages && <ImageGallery items={images} showModal={showModal} />}
        {isImages && (
          <div className={styles.btnWrapper}>
            <Button onClick={loadMore} type="button">
              Load more
            </Button>
          </div>
        )}
        {modalOpen && (
          <Modal largeImageURL={imageModal.largeImageURL} close={closeModal} />
        )}
      </>
    );
  }
}
*/

export default PixabayFinder;
