import axios from "axios";

class MarvelApiService {
  constructor() {
    this.apiKey = "2e1cdeec426ae323484f29024084c206";
    this.hash = "d516513ba95b9407c7aca0f73b241f8a";
    this.timestamp = "1"; // Consider using a dynamic timestamp for each request
    this.baseUrl = "https://gateway.marvel.com/v1/public";
  }

  getUrl(endpoint, id = "") {
    return `${this.baseUrl}/${endpoint}${id ? `/${id}` : ""}?ts=${
      this.timestamp
    }&apikey=${this.apiKey}&hash=${this.hash}`;
  }
  getUrls(endpoint) {
    return `${this.baseUrl}/${endpoint}?ts=${this.timestamp}&apikey=${this.apiKey}&hash=${this.hash}`;
  }

  GetApiCall(url) {
    return axios.get(url);
  }

  GetCharacterByName(name) {
    const url = `${this.getUrl("characters")}&nameStartsWith=${name}`;
    return this.GetApiCall(url);
  }

  GetComicById(id) {
    const url = this.getUrl("comics", id);
    return this.GetApiCall(url);
  }

  // Event API methods
  GetEvents() {
    const url = this.getUrl("events");
    return this.GetApiCall(url);
  }

  GetEventById(id) {
    const url = this.getUrl("events", id);
    return this.GetApiCall(url);
  }

  GetEventComics(id) {
    const url = this.getUrl(`events/${id}/comics`);
    return this.GetApiCall(url);
  }

  GetEventCharacters(id) {
    const url = this.getUrl(`events/${id}/characters`);
    return this.GetApiCall(url);
  }

  GetEventCreators(id) {
    const url = this.getUrl(`events/${id}/creators`);
    return this.GetApiCall(url);
  }

  // GetCreatorByName(name) {
  //   const url = `${this.getUrls("creators")}&nameStartsWith=${name}`;
  //   return this.GetApiCall(url);
  // }
  // Method to encode special characters in the name for API requests
  encodeName(name) {
    return encodeURIComponent(name);
  }

  GetCreatorByName(name) {
    const encodedName = this.encodeName(name); // Encode the name before making the request
    const url = `${this.getUrls("creators")}&nameStartsWith=${encodedName}`;
    return this.GetApiCall(url);
  }

  GetEventSeries(id) {
    const url = this.getUrl(`events/${id}/series`);
    return this.GetApiCall(url);
  }

  GetEventStories(id) {
    const url = this.getUrl(`events/${id}/stories`);
    return this.GetApiCall(url);
  }
}

export const marvelUrls = {
  FETCH_CHARACTERS: "https://gateway.marvel.com/v1/public/characters",
  FETCH_COMICS: "https://gateway.marvel.com/v1/public/comics",
  FETCH_EVENTS: "https://gateway.marvel.com/v1/public/events",
};

export default new MarvelApiService();
