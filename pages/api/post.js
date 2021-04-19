import { clientApi } from '../../lib/sanity.server';
import { createReadStream } from 'fs';
import formidable from 'formidable';
import { getSession } from 'next-auth/client';

export const config = {
  api: {
    bodyParser: false
  }
};

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) {
    res.status(401).json({ message: 'Unauthorized' });
  }

  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
  const token = process.env.NEXT_PUBLIC_SANITY_API_TOKEN;

  let successMessage = '';
  let errorMessage = '';
  let errorMessageMethod = 'Method not allowed.';

  const form = new formidable.IncomingForm();
  let mutations = [];

  form.parse(req, function (err, fields, files) {
    // CREATE
    if (req.method === 'POST') {
      delete fields._id;
      delete fields.mainImageToUpload;
      mutations = [{ create: fields }];
      successMessage = 'Post created with success!';
      errorMessage = 'An error happened when trying to create the post.';
    }

    // UPDATE
    if (req.method === 'PUT') {
      const id = fields._id;
      delete fields._id;
      delete fields.mainImageToUpload;
      mutations = [{ patch: { id, set: fields } }];
      successMessage = 'Post updated with success!';
      errorMessage = 'An error happened when trying to update the post.';
    }

    // DELETE
    if (req.method === 'DELETE') {
      mutations = [{ delete: fields }];
      successMessage = 'Post deleted with success!';
      errorMessage = 'An error happened when trying to delete the post.';
    }

    // CREATE and UPDATE and DELETE
    if (
      req.method === 'POST' ||
      req.method === 'PUT' ||
      req.method === 'DELETE'
    ) {
      const updateContent = (updateImage) =>
        fetch(
          `https://${projectId}.api.sanity.io/v1/data/mutate/${dataset}?returnIds=true`,
          {
            method: 'POST',
            headers: {
              'Content-type': 'application/json',
              Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ mutations })
          }
        )
          .then((response) => {
            return response.json();
          })
          .then((response) => {
            if (response.error) {
              res.status(500).json({ message: errorMessage });
            } else {
              const postId = response.results[0].id;

              if (updateImage) {
                updateImage(postId)
                  .then((post) => {
                    res
                      .status(200)
                      .json({ message: successMessage, id: postId });
                  })
                  .catch((error) => {
                    res.status(500).json({ message: errorMessage });
                  });
              } else {
                res.status(200).json({ message: successMessage, id: postId });
              }
            }
          })
          .catch((error) => {
            res.status(500).json({ message: errorMessage });
          });

      // CREATE and UPDATE
      if (req.method === 'POST' || req.method === 'PUT') {
        const image = files.mainImageToUpload;

        if (image) {
          clientApi.assets
            .upload('image', createReadStream(image.path), {
              filename: image.name
            })
            .then((imageAsset) => {
              updateContent((postId) =>
                clientApi
                  .patch(postId)
                  .set({
                    mainImage: {
                      _type: 'image',
                      asset: {
                        _type: 'reference',
                        _ref: imageAsset._id
                      }
                    }
                  })
                  .commit()
                  .then((post) => post)
                  .catch((error) => {
                    res.status(500).json({ message: errorMessage });
                  })
              );
            })
            .catch((error) => {
              res.status(500).json({ message: errorMessage });
            });
        } else {
          updateContent();
        }
      } else {
        updateContent();
      }
    }
    // Method not allowed
    else {
      res.status(500).json({ message: errorMessageMethod });
    }
  });
}
