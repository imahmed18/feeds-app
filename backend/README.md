# Node.js Express Feed App

This is a basic Node.js Express application utilizing Express Validator for input validation and Mongoose for MongoDB integration.

## Installation

`npm install`

## Project Structure

- `app.js`: Entry point of the application.
- `routers/`: Directory containing route handlers.
- `models/`: Directory containing Mongoose models.
- `uploads/`: Directory containing static uploaded files.

## Environment Variables

Create a `.env` file in the root directory of the project and add the following variables:

```dotenv
PORT=8080
MONGO_DB_CONNECTION_STRING=<your-mongodb-uri>
```

## Running Server

Run the server with either one of the scripts

- for dev mode:

  ```
  npm run start:dev
  ```

  This will run the server in development mode using a dev-dependency of `nodemon`. This package re-runs the server on file changes.

- for prod mode:
  ```
  npm run start
  ```
  This will execute the server in a production environment.

## Endpoints

### [GET] `feed/`

This endpoint will fetch all the feed items sorted by `DESC` on `createdAt` field.

#### Improvements:

- The get endpoint could support pagination for infinite scroll on feed screen.
- Rather than TCP we could have used UDP for faster data retrieval.
- We could have indexed certain keys on feed model for faster retrieval.
- We could make this endpoint query-able by supporting query parameters.
- For streaming data we could use range-fetch mechanism, so data could be streamed in chunks.

### [POST] `feed/`

This endpoint is used to create feed items. The payload to this endpoint should be

```
{ text: String, images: [base64] }
```

#### Improvements:

- We could have used `multipart/formdata` for images or a cloud storage like S3 Buckets or GCP Buckets.
- Further validations on image mimetypes or and images could be processed in to higher resolutions or smaller sizes.
