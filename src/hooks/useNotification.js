import { useEffect } from 'react';

import PropTypes from 'prop-types';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export default function useNotification(status, dataLength, total, page) {
  useEffect(() => {
    status === 'resolved' &&
      page === 1 &&
      dataLength > 0 &&
      total !== 0 &&
      Notify.info(`Hooray! We found ${total} images.`);

    status === 'resolved' &&
      total === 0 &&
      dataLength === 0 &&
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );

    status === 'resolved' &&
      dataLength > 0 &&
      dataLength === total &&
      Notify.warning(
        "We're sorry, but you've reached the end of search results."
      );
  }, [status, dataLength, page, total]);

  return null;
}

Notification.propTypes = {
  status: PropTypes.string.isRequired,
  dataLength: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
};
