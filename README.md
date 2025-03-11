# Upload and Download images using Node.js

This is a simple Express.js API for handling file uploads, retrieving images, and downloading files using Multer and GridFS.

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/prasetya12/image-uploader
   cd image-uploader
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables:
   Create a `.env` file in the root directory and add the following:
   ```sh
   MONGO_URI=mongodb://{username}:{password}@{host}:{port}/{db_name}
   PORT=5000
   ```
4. Start the server:
   ```sh
   npm start
   ```

## API Endpoints

### Upload a File

**Endpoint:** `POST /api/images/upload`

**Description:** Uploads a single file using Multer.

**Request:**

- **Content-Type:** `multipart/form-data`
- **Body:**
  - `file`: The file to be uploaded.

**Response:**

```json
{
  "message": "File uploaded successfully",
  "file": {
    "success": true,
    "message": "File uploaded successfully",
    "filename": "example.png"
  }
}
```

---

### Get All Images

**Endpoint:** `GET /api/images`

**Description:** Retrieves a list of all uploaded images.

**Response:**

```json
{
  "data": [
    {
      "_id": "67d0874db181395513441b6d",
      "filename": "1741719372828_9C15161.png",
      "contentType": "image/png",
      "uploadDate": "2025-03-11T18:56:13.256Z",
      "__v": 0
    }
  ]
}
```

---

### Download a File

**Endpoint:** `GET /api/images/download/:filename`

**Description:** Downloads a file by its filename.

**Request:**

- **Params:**
  - `filename`: The name of the file to download.

**Response:**

- Returns the requested file as a binary stream.

## Technologies Used

- **Express.js** - Web framework for Node.js
- **Multer** - Middleware for handling file uploads
- **MongoDB (GridFS)** - File storage system

## License

This project is licensed under the MIT License.
