import React, { useEffect, useState } from "react";
import instance from "../axios";

function ImageUpload() {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  const [previewImageUrl, setPreviewImageUrl] = useState(null); 

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
    setPreviewImageUrl(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    try {
      const response = await instance.post("/upload", formData);
      setImageUrl(response.data.imageUrl);
      setImage(null);
      setPreviewImageUrl(null);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await instance.get("/images");
        setImageUrls(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchImages();
  }, [imageUrl]);

  return (
    <div className="container mx-auto py-10 flex flex-col lg:flex-row px-12">
      {/* Form for uploading image */}

      <div className="w-full lg:w-1/2 lg:pr-8 mb-8">
        <form onSubmit={handleSubmit} className="mb-4 lg:fixed w-1/3">
          <h2 className="text-2xl font-bold mb-4">Upload an Image</h2>
          <label className="block mb-2 font-bold text-gray-700">
            Choose an image to upload:
          </label>
          <input
            type="file"
            onChange={handleFileChange}
            className="border rounded px-4 py-2 w-full"
          />

          {/* A preview for uploading image */}

          {previewImageUrl && (
            <img
              src={previewImageUrl}
              alt="Preview"
              className="rounded mt-4 "
              style={{ maxWidth: "100%" }}
            />
          )}

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 w-full"
            disabled={!image}
          >
            Upload
          </button>
        </form>
      </div>

      {/* Showing the images on right side */}

      <div className="w-full lg:w-1/2 overflow-auto">
        {imageUrls && (
          <h2 className="text-2xl font-bold mb-4">Uploaded Images</h2>
        )}
        {imageUrls.map((imageUrl) => (
          <div key={imageUrl} className="mb-4">
            <img
              src={`http://localhost:5000${imageUrl}`}
              alt="Uploaded"
              className="rounded"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImageUpload;
