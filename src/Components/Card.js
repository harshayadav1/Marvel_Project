import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Card = ({ data }) => {
  let navigate = useNavigate();

  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Load favorites from localStorage when component mounts
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
  }, []);

  const handleFavorite = (item) => {
    let newFavorites = [...favorites];
    if (!newFavorites.some((fav) => fav.id === item.id)) {
      newFavorites.push(item);
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
    } else {
      newFavorites = newFavorites.filter((fav) => fav.id !== item.id);
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
    }
    setFavorites(newFavorites);
  };

  return (
    <>
      {data
        ? data.map((item) => {
            const isFavorite = favorites.some((fav) => fav.id === item.id);

            return (
              <div
                className="card"
                key={item.id}
                onClick={() => navigate(`/${item.id}`)}
              >
                <img
                  src={`${item.thumbnail.path}.${item.thumbnail.extension}`}
                  alt=""
                />
                <div className="title">
                  <h3>{item.name}</h3>
                  <button
                    className={`favorite-button ${isFavorite ? "active" : ""}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleFavorite(item);
                    }}
                  >
                    {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                  </button>
                </div>
              </div>
            );
          })
        : ""}
    </>
  );
};
