import SearchBar from './SearchBar';
import ImageGallery from './ImageGallery';
import Modal from './Modal';
import { useState, useEffect } from 'react';

import fetchImages from './HTTP/fetchImages';
import Button from './Button';
import Loader from './Loader';

export default function App() {
  const [request, setRequest] = useState('');
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [status, setStatus] = useState('idle');
  const [showModal, setShowModal] = useState(false);
  const [link, setLink] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!request) {
      return;
    }
    fetchImages(request, page)
      .then(newData => {
        return (
          setData(prevData => [...prevData, ...newData.hits]),
          setTotal(newData.total),
          setStatus('resolved')
        );
      })
      .catch(error => {
        setError(error);
        setStatus('rejected');
      });
  }, [request, page]);

  const onLoadMoreClick = () => {
    setStatus('pending');
    setPage(state => state + 1);
  };

  const addRequest = newRequest => {
    setData([]);
    setRequest(newRequest);
    setPage(1);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const changeLink = newLink => {
    toggleModal();
    setLink(newLink);
  };

  return (
    <>
      <SearchBar onSubmit={addRequest} />

      {status === 'idle' && <></>}

      {data.length > 0 && <ImageGallery onSubmit={changeLink} data={data} />}

      {status === 'rejected' && <>{error}</>}

      {status === 'resolved' && data.length > 0 && data.length < total && (
        <Button loadMore={() => onLoadMoreClick()} />
      )}

      {status === 'pending' && <Loader />}

      {showModal && <Modal onClose={toggleModal} link={link} />}
    </>
  );
}
