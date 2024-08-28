import React, { useEffect, useState } from "react";
import Apiservice from "../ApiService/Apiservice";
import { Card } from "./Card";

export const Main = () => {
  const [item, setItem] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchMarvelCharacters = async (url, prefetch = false) => {
    if (!prefetch) setLoading(true);
    try {
      const response = await Apiservice.GetApiCall(url);
      if (response.status === 200) {
        const results = response.data.data.results;
        setItem(results);
        const totalItems = response.data.data.total;
        setTotalPages(Math.ceil(totalItems / 20));

        if (page < totalPages && !prefetch) {
          const nextPageUrl = `${url}&offset=${page * 20}`;
          fetchMarvelCharacters(nextPageUrl, true);
        }
      }
    } catch (error) {
      console.error("Error fetching Marvel characters:", error);
    } finally {
      if (!prefetch) setLoading(false);
    }
  };

  const fetchAllCreators = async () => {
    try {
      const response = await Apiservice.GetApiCall(
        `${Apiservice.getUrls("creators")}`
      );
      const creators = response.data.data.results;
      console.log("my all creators:", creators);

      // Log all creator names to the console
      creators.forEach((creator) => {
        // console.log("Creator Name:", creator.fullName);
        // console.log(creator);
      });
    } catch (error) {
      console.error("Error fetching creators:", error);
    }
  };

  const searchMarvel = async (e) => {
    console.log("e", e);
    console.log(e.target.value);

    if (e.key === "Enter") {
      setLoading(true);
      try {
        let response;
        // Check if the search term is for a creator
        if (search.toLowerCase().startsWith("creator:")) {
          const creatorName = search.split("creator:")[1].trim();
          console.log("creator name", creatorName);
          // console.log("hello");
          if (creatorName) {
            // console.log("hi");
            console.log(`Searching for creator: ${creatorName}`);
            response = await Apiservice.GetCreatorByName(creatorName);
            console.log("Creator API Response:", response);
            const creators = response.data.data.results;

            // Log creator search results
            console.log("Creator Search Results:", creators);

            // Log each creator's name
            creators.forEach((creator) => {
              console.log("Creator Name:", creator.name);
            });

            setItem(creators);
          } else {
            setItem([]);
          }
        } else {
          // If the search term is not a number, search for characters
          console.log("hi");
          response = await Apiservice.GetCharacterByName(search);
          setItem(response.data.data.results);
          console.log("search by charactor name:", response);
        }
      } catch (error) {
        console.error("Error during search:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchAllCreators();
    const initialUrl = `${Apiservice.getUrl("characters")}&offset=${
      (page - 1) * 20
    }`;
    fetchMarvelCharacters(initialUrl);
  }, [page]);

  return (
    <>
      <div className="header">
        <div className="bg">
          <img src="./Images/bg1.png" alt="" />
        </div>
        <div className="search-bar">
          <img src="./Images/logo.jpg" alt="logo" />
          <input
            type="search"
            placeholder="Search Here"
            className="search"
            onChange={(e) => setSearch(e.target.value)}
            onKeyPress={searchMarvel}
          />
          {loading && <span className="loading"></span>}
        </div>
      </div>
      <div className="content">
        {loading ? (
          <p>Loading...</p>
        ) : !item.length ? (
          <p>Not Found</p>
        ) : (
          <Card data={item} />
        )}
      </div>
      <div className="pagination">
        <button
          disabled={page === 1 || loading}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          disabled={page === totalPages || loading}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </>
  );
};
