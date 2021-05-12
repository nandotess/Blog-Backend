import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import Link from 'next/link';
import NProgress from 'nprogress';
import {
  Box,
  TextField,
  Button,
  MenuItem,
  Backdrop,
  CircularProgress
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { Editor } from '@tinymce/tinymce-react';

import { urlForImage } from '@lib/sanity';

import formatDate from '@util/formatDate';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginRight: theme.spacing(2)
    }
  }
}));

export default function Post({ id, post, authors }) {
  const router = useRouter();
  const classes = useStyles();
  const isNew = id === 'new';

  const [data, setData] = useState({
    _type: 'post',
    _id: post._id || '',
    title: post.title || '',
    author: post.author?._id || '',
    body: post.body || '',
    publishedAt: formatDate(new Date()),
    mainImageToUpload: ''
  });

  const [feedback, setFeedback] = useState({
    type: '',
    message: ''
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = (event) => {
    event.preventDefault();

    NProgress.start();
    setIsLoading(true);

    const formData = new FormData();
    Object.keys(data).forEach((key) => formData.append(key, data[key]));

    fetch('/api/post', {
      method: isNew ? 'POST' : 'PUT',
      body: formData
    })
      .then((response) => {
        NProgress.done();
        setIsLoading(false);
        return response.json();
      })
      .then((response) => {
        if (response.id) {
          setFeedback({
            type: 'success',
            message: response.message
          });

          setTimeout(() => router.push('/'), 2000);
        } else {
          setFeedback({
            type: 'error',
            message: response.message
          });
        }
      })
      .catch((error) => {
        setFeedback({
          type: 'error',
          message: error.message
        });
      });
  };

  return (
    <>
      <Backdrop open={isLoading} style={{ zIndex: 1501 }}>
        <CircularProgress />
      </Backdrop>

      {feedback.message && (
        <MuiAlert variant="filled" severity={feedback.type}>
          {feedback.message}
        </MuiAlert>
      )}

      <form onSubmit={handleFormSubmit} autoComplete="off">
        <Box my={3}>
          <TextField
            label="Title"
            variant="filled"
            id="title"
            required={true}
            fullWidth={true}
            value={data.title}
            onChange={(e) =>
              setData((oldData) => ({ ...oldData, title: e.target.value }))
            }
          />
        </Box>

        <Box my={3}>
          <TextField
            label="Author"
            variant="filled"
            id="author"
            required={true}
            fullWidth={true}
            value={data.author}
            onChange={(e) =>
              setData((oldData) => ({ ...oldData, author: e.target.value }))
            }
            select>
            {authors &&
              authors.map((author, i) => {
                return (
                  <MenuItem key={i} value={author._id}>
                    {author.displayName}
                  </MenuItem>
                );
              })}
          </TextField>
        </Box>

        <Box my={3}>
          <Editor
            id="message"
            initialValue={post.body}
            onEditorChange={(value) =>
              setData((oldData) => ({ ...oldData, body: value }))
            }
            init={{
              height: 300,
              menubar: false,
              plugins: [
                'advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table paste code help wordcount'
              ],
              toolbar:
                'undo redo | formatselect | bold italic backcolor | \
              alignleft aligncenter alignright alignjustify | \
              bullist numlist outdent indent | removeformat | help'
            }}
          />
        </Box>

        {post.mainImage && (
          <Box my={3}>
            <img src={urlForImage(post.mainImage).width('150').url()} />
          </Box>
        )}

        <Box my={3}>
          <input
            type="file"
            onChange={(e) =>
              setData((oldData) => ({
                ...oldData,
                mainImageToUpload: e.target.files[0]
              }))
            }
          />
        </Box>

        <Box my={3} className={classes.root}>
          <Link href="/" passHref={true}>
            <Button variant="contained">Back</Button>
          </Link>

          <Button variant="contained" color="primary" type="submit">
            {isNew ? 'Create' : 'Update'}
          </Button>
        </Box>
      </form>
    </>
  );
}

Post.propTypes = {
  id: PropTypes.string.isRequired,
  post: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired
};
