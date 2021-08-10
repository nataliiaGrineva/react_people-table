import React, { useEffect } from 'react';

const NotFoundPage = () => {
  useEffect(() => {
    document.title = '404 not found';

    return () => {
      document.title = 'People table';
    };
  }, []);

  return (
    <h2>Not found</h2>);
};

export default NotFoundPage;
