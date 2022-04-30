import { useState, useEffect } from 'react';

import SearchBar from './components/SearchBar';
import ImageGallery from './components/ImageGallery';
import Modal from './components/Modal';
import Button from './components/Button';
import Loader from './components/Loader';
import fetchImages from './services/fetchImages';
import Notification from './components/Notification';

export default function App() {
  const [request, setRequest] = useState('');
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [status, setStatus] = useState('idle');
  const [link, setLink] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!request) {
      return;
    }
    setStatus('pending');
    fetchImages(request, page)
      .then(newData => {
        return (
          setData(prevData => [
            ...prevData,
            ...newData.hits.map(item => ({
              id: item.id,
              webLink: item.webformatURL,
              link: item.largeImageURL,
              tags: item.tags,
            })),
          ]),
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
    setPage(state => state + 1);
  };

  const addRequest = newRequest => {
    setData([]);
    setPage(1);
    setTotal(0);
    setStatus('idle');
    setRequest(newRequest);
  };

  const addLink = newLink => {
    setLink(newLink);
  };

  const deleteLink = () => {
    setLink(null);
  };

  return (
    <>
      <SearchBar onSubmit={addRequest} />

      {status === 'idle' && <></>}

      {data.length > 0 && <ImageGallery onSubmit={addLink} data={data} />}

      {status === 'rejected' && <>{error}</>}

      {status === 'resolved' && data.length > 0 && data.length < total && (
        <Button loadMore={() => onLoadMoreClick()} />
      )}

      {status === 'pending' && <Loader />}

      {link && <Modal onClose={deleteLink} link={link} />}

      <Notification
        status={status}
        dataLength={data.length}
        total={total}
        page={page}
      />
    </>
  );
}
