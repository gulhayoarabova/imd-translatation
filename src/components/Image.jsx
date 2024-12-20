/** @format */
import React, { useState, useEffect } from 'react';
import { instance } from '../api/api.instance.js';
import store from '../store/store.jsx';
// Cache to store fetched images
const imageCache = new Map();

const ImageWithAuth = ({ url }) => {
  const { selectedLanguage, setLanguage , error , token } = store();


  const [imageSrc, setImageSrc] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        // Check if the image is already in the cache
        if (imageCache.has(url)) {
          setImageSrc(imageCache.get(url));
          setLoading(false);
          return;
        }

        // Fetch the image if not in cache
        const response = await instance(url, {
          headers: {
            Authorization: `${token}`,
          },
          responseType: 'blob', // Ensure the response is treated as binary
          responseType: 'blob', // Ensure the response is treated as binary
        });

        if (response.status !== 200) {
          throw new Error('Failed to fetch image');
        }

        const blob = response.data; // Axios returns the data directly
        const imageBlobUrl = URL.createObjectURL(blob);

        // Cache the URL and update state
        imageCache.set(url, imageBlobUrl);
        setImageSrc(imageBlobUrl);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching image:', error);
        setLoading(false);
      }
    };

    fetchImage();

    // Cleanup when component unmounts
    return () => {
      if (imageCache.has(url)) {
        const cachedUrl = imageCache.get(url);
        URL.revokeObjectURL(cachedUrl);
        imageCache.delete(url);
      }
    };
  }, [url]);

  return (
    <div>
      {loading ? (
        <p>Loading image...</p>
      ) : (
        <img src={imageSrc} alt="Preview" className="max-w-full h-auto" />
      )}
    </div>
  );
};

export default ImageWithAuth;
