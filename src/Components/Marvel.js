import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

export const Marvel = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCharacter = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://gateway.marvel.com:443/v1/public/characters/${id}?ts=1&apikey=2e1cdeec426ae323484f29024084c206&hash=d516513ba95b9407c7aca0f73b241f8a`
      );
      console.log("API Response:", res.data); // Log the entire API response
      setItem(res.data.data.results[0]);
    } catch (error) {
      console.error("Error fetching character data:", error);
      setError("Failed to load character details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCharacter();
  }, [id]);

  if (loading) {
    return <p className="BeforeLoading">Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      {!item ? (
        <p>Character not found</p>
      ) : (
        <div className="box-content">
          <div className="right-box">
            <img
              src={`${item.thumbnail.path}.${item.thumbnail.extension}`}
              alt={item.name}
            />
          </div>

          <div className="left-box">
            <h1>{item.name}</h1>
            <h4>{item.description}</h4>
          </div>
          <div className="extra-data-box">
            <h2>Additional Information</h2>
            <div className="extra-data-section">
              <h4>Comics</h4>
              <ul>
                {item.comics.items.map((comic, index) => (
                  <li key={index}>{comic.name}</li>
                ))}
              </ul>
            </div>
            <div className="extra-data-section">
              <h4>Events</h4>
              <ul>
                {item.events.items.length > 0 ? (
                  item.events.items.map((event, index) => (
                    <li key={index}>{event.name}</li>
                  ))
                ) : (
                  <li>No events available</li>
                )}
              </ul>
            </div>
            <div className="extra-data-section">
              <h4>Stories</h4>
              <ul>
                {item.stories.items.map((story, index) => (
                  <li key={index}>{story.name}</li>
                ))}
              </ul>
            </div>
            <div className="extra-data-section">
              <h4>Series</h4>
              <ul>
                {item.series.items.map((series, index) => (
                  <li key={index}>{series.name}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
