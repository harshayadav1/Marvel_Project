import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Apiservice from "../ApiService/Apiservice";

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [comics, setComics] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [selectedComic, setSelectedComic] = useState(null); // State for selected comic
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEventDetails = async () => {
      setLoading(true);
      try {
        console.log(`Fetching details for event ID: ${id}`); // Debugging line
        const [eventResponse, comicsResponse, charactersResponse] =
          await Promise.all([
            Apiservice.GetEventById(id),
            Apiservice.GetEventComics(id),
            Apiservice.GetEventCharacters(id),
          ]);

        console.log("Event Response:", eventResponse); // Debugging line
        console.log("Comics Response:", comicsResponse); // Debugging line
        console.log("Characters Response:", charactersResponse); // Debugging line

        setEvent(eventResponse.data.data.results[0]);
        setComics(comicsResponse.data.data.results);
        setCharacters(charactersResponse.data.data.results);
      } catch (err) {
        console.error("Error fetching event details:", err); // Log error
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [id]);

  const handleComicClick = async (comicId) => {
    setLoading(true);
    try {
      const comicResponse = await Apiservice.GetComicById(comicId);
      setSelectedComic(comicResponse.data.data.results[0]);
    } catch (err) {
      console.error("Error fetching comic details:", err); // Log error
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="BeforeLoading">Loading event details...</p>;
  if (error) return <p className="error-message">Error: {error}</p>;

  return (
    <div className="event-details">
      {event && (
        <>
          <div className="event-header">
            <h1>{event.title}</h1>
            <p className="event-description">
              {event.description || "No description available"}
            </p>
          </div>
          <div className="event-content">
            <div className="comics-section">
              <h2>Comics</h2>
              <ul className="items-list">
                {comics.length > 0 ? (
                  comics.map((comic) => (
                    <li key={comic.id}>
                      <Link
                        to="#"
                        onClick={() => handleComicClick(comic.id)}
                        className="item-link"
                      >
                        {comic.title}
                      </Link>
                    </li>
                  ))
                ) : (
                  <li>No comics available</li>
                )}
              </ul>
            </div>
            <div className="characters-section">
              <h2>Characters</h2>
              <ul className="items-list text-white">
                {characters.length > 0 ? (
                  characters.map((character) => (
                    <li key={character.id}>
                      <Link
                        to={`/characters/${character.id}`}
                        className="item-link"
                      >
                        {character.name}
                      </Link>
                    </li>
                  ))
                ) : (
                  <li>No characters available</li>
                )}
              </ul>
            </div>
            {selectedComic && (
              <div className="comic-details">
                {loading && <p>Loading comic details...</p>}
                {error && <p className="error-message">{error}</p>}
                {selectedComic && (
                  <>
                    <h1>{selectedComic.title}</h1>
                    <img
                      src={`${selectedComic.thumbnail.path}.${selectedComic.thumbnail.extension}`}
                      alt={selectedComic.title}
                    />
                    <p>
                      {selectedComic.description || "No description available"}
                    </p>
                    <div className="comic-info">
                      <h2>Characters:</h2>
                      <ul className="text-white">
                        {selectedComic.characters.items.length > 0 ? (
                          selectedComic.characters.items.map((character) => (
                            <li key={character.name}>{character.name}</li>
                          ))
                        ) : (
                          <li>No characters available</li>
                        )}
                      </ul>
                      <h2>Creators:</h2>
                      <ul className="text-white">
                        {selectedComic.creators.items.length > 0 ? (
                          selectedComic.creators.items.map((creator) => (
                            <li key={creator.name}>
                              {creator.name} ({creator.role})
                            </li>
                          ))
                        ) : (
                          <li>No creators available</li>
                        )}
                      </ul>
                      <h2>Events:</h2>
                      <ul className="text-white">
                        {selectedComic.events.items.length > 0 ? (
                          selectedComic.events.items.map((event) => (
                            <li key={event.name}>{event.name}</li>
                          ))
                        ) : (
                          <li>No events available</li>
                        )}
                      </ul>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default EventDetails;
