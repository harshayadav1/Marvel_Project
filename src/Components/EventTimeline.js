import React, { useEffect, useState } from "react";
import Apiservice from "../ApiService/Apiservice";
import { Link } from "react-router-dom";

const EventTimeline = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await Apiservice.GetEvents();
        console.log("API Response:", response); // Log the API response
        setEvents(response.data.data.results);
      } catch (err) {
        console.error("API Error:", err); // Log any errors
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) return <p className="BeforeLoading">Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="event-timeline">
      <h1>Marvel Event Timeline</h1>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            <h2>{event.title}</h2>
            <p>{event.description || "No description available"}</p>
            <Link to={`/events/${event.id}`}>View Details</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventTimeline;
