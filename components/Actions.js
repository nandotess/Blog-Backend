import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import NProgress from 'nprogress';
import { IconButton } from '@material-ui/core';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';

export default function Actions({
  id,
  setFeedback,
  setIsLoading,
  refreshData
}) {
  const handleDelete = (event) => {
    event.preventDefault();

    NProgress.start();
    setIsLoading(true);

    fetch('/api/post', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id })
    })
      .then((response) => {
        NProgress.done();
        setIsLoading(false);
        refreshData();
        return response.json();
      })
      .then((response) => {
        setFeedback({
          type: 'success',
          message: response.message
        });
      })
      .catch((error) => {
        setFeedback({
          type: 'error',
          message: error.message
        });
      });
  };

  return (
    <React.Fragment>
      <Link href={`/post/${id}`} passHref={true}>
        <IconButton component="a" size="small">
          <CreateOutlinedIcon />
        </IconButton>
      </Link>

      <IconButton size="small" onClick={handleDelete}>
        <DeleteOutlineOutlinedIcon />
      </IconButton>
    </React.Fragment>
  );
}

Actions.propTypes = {
  id: PropTypes.string.isRequired,
  setFeedback: PropTypes.func.isRequired,
  setIsLoading: PropTypes.func.isRequired,
  refreshData: PropTypes.func.isRequired
};
