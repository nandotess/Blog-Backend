import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Box, Button, Backdrop, CircularProgress } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import MuiAlert from '@material-ui/lab/Alert';
import formatDate from '../util/formatDate';
import Actions from './Actions';

export default function Posts({ posts }) {
  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
  };

  const [feedback, setFeedback] = useState({
    type: '',
    message: ''
  });

  const [isLoading, setIsLoading] = useState(false);

  const rows = [];

  posts.forEach((post, i) => {
    rows[i] = {
      id: post._id,
      title: post.title,
      publishedAt: post.publishedAt,
      author: post.author?.displayName
    };
  });

  const columns = [
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      renderCell: function (params) {
        return (
          <Actions
            id={params.row.id}
            setFeedback={setFeedback}
            setIsLoading={setIsLoading}
            refreshData={refreshData}
          />
        );
      },
      width: 100
    },
    { field: 'title', headerName: 'Title', flex: 1 },
    {
      field: 'publishedAt',
      headerName: 'Published at',
      flex: 1,
      valueFormatter: function (params) {
        return formatDate(params.value);
      }
    },
    { field: 'author', headerName: 'Author', flex: 1 }
  ];

  return (
    <React.Fragment>
      <Backdrop open={isLoading} style={{ zIndex: 1501 }}>
        <CircularProgress />
      </Backdrop>

      {feedback.message && (
        <MuiAlert variant="filled" severity={feedback.type}>
          {feedback.message}
        </MuiAlert>
      )}

      <Box my={3}>
        <Link href="/post/new" passHref={true}>
          <Button variant="contained" color="primary">
            New Post
          </Button>
        </Link>
      </Box>

      <Box my={3}>
        <DataGrid
          columns={columns}
          rows={rows}
          autoHeight={true}
          rowHeight={40}
          disableSelectionOnClick={true}
          disableColumnMenu={true}
          pageSize={rows.length}
          rowCount={rows.length}
          rowsPerPageOptions={[]}
          disableExtendRowFullWidth={true}
        />
      </Box>
    </React.Fragment>
  );
}

Posts.propTypes = {
  posts: PropTypes.array.isRequired
};
