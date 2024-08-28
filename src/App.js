import React from "react";
import { Main } from "./Components/Main";
import "./Components/style.css";
import { Routes, Route } from "react-router-dom";
import { Marvel } from "./Components/Marvel";
import { Favorites } from "./Components/Favorites";
import EventTimeline from "./Components/EventTimeline";
import EventDetails from "./Components/EventDetails";
import Header from "./Components/Header";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/:id" element={<Marvel />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/events" element={<EventTimeline />} />
        <Route path="/events/:id" element={<EventDetails />} />
      </Routes>
    </>
  );
}

export default App;
