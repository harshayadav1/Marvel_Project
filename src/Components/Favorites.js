import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  const removeFavorite = (id) => {
    const updatedFavorites = favorites.filter((item) => item.id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <div className="favorites-container">
      <h2>Your Favorite Marvel Characters</h2>
      <div className="favorites-grid">
        {favorites.length ? (
          favorites.map((item) => (
            <div className="favorite-card" key={item.id}>
              <button
                className="remove-favorite"
                onClick={() => removeFavorite(item.id)}
              >
                &times;
              </button>
              <Link to={`/${item.id}`} className="favorite-link">
                <div className="favorite-image-wrapper">
                  <img
                    src={`${item.thumbnail.path}.${item.thumbnail.extension}`}
                    alt={item.name}
                    className="favorite-image"
                  />
                </div>
                <div className="favorite-info">
                  <h3>{item.name}</h3>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <p className="no-favorites-message">
            You haven't added any favorites yet!
          </p>
        )}
      </div>
    </div>
  );
};
