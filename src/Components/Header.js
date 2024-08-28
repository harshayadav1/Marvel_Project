import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="favorites-link-container">
      <Link to="/" className="favorites-link">
        Home
      </Link>
      <Link to="/events" className="favorites-link">
        Marvel Event Timeline
      </Link>
      <Link to="/favorites" className="favorites-link">
        View Favorites
      </Link>
    </div>
  );
};

export default Header;
