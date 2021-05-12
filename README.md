# Blog Backend

- [Vercel](https://vercel.com/) (cloud hosting)
- [React](https://reactjs.org/)
- [Next.js](https://nextjs.org/) (React Framework)

## Notes

- The backend is in the Vercel cloud, on a free tire plan.
- This repository contains all **backend** from the [Blog](https://github.com/nandotess/blog) project.
- [GROQ](https://www.sanity.io/docs/groq) is used to communicate with the database (GET).
- [REST API](https://www.sanity.io/docs/http-api) is used to communicate with the database (POST, PUT and DELETE).
- [SSR](https://vercel.com/blog/nextjs-server-side-rendering-vs-static-generation) feature is used for **Server Side Rendering**.

## Updating Production CMS

- When pushing code to `main` branch, Vercel will automatically deploy the code to [production cms](https://admin-nandotess.vercel.app/).

## Localhost

- To run the project on localhost:
  - Execute `npm install` in your terminal.
  - Rename `.env.SAMPLE` to `.env` and update the values of the variables `NEXT_PUBLIC_SANITY_PROJECT_ID`, `SANITY_API_TOKEN`, `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`.
  - Execute `npm run dev` in your terminal.

## TODO

- Pagination
- Improve the image update experience
