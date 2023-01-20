import React, { useState } from "react";
import { Icon, Button } from "react-materialize";
const printTypes = ["all", "books", "magazines"];
const bookTypes = ["partial", "full", "free-ebooks", "paid-ebooks", "ebooks"];

const apiKey = "AIzaSyCIxIIcpTwWrV5HmCj_q4AWZRAqD7y6CFI";
const apiURL = "https://www.googleapis.com/books/v1/volumes";

export const SearchBook = (props) => {
  const [state, setState] = useState({
    searchTerm: "",
    printType: "all",
    bookType: "full",
    name: "",
  });

  const handleChange = (event) => {
    const {
      target: { name, value },
    } = event;
    console.log(name, value);
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchBooks();
  };

  const fetchBooks = () => {
    const getURL = `${apiURL}?key=${apiKey}&langRestrict=en&maxResults=40&orderBy=relevance&q=${state.searchTerm}&filter=${state.bookType}&printType=${state.printType}`;
    fetch(getURL)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Something went wrong, please try again later.");
        }
        return res;
      })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        setState({
          error: err.message,
        });
      });
  };
  const bookTypeOptions = () =>
    bookTypes.map((bookTypeOption, i) => (
      <option value={bookTypeOption} key={bookTypeOption}>
        {bookTypeOption}
      </option>
    ));
  const printTypeOptions = () =>
    printTypes.map((printTypeOption, i) => (
      <option value={printTypeOption} key={printTypeOption}>
        {printTypeOption}
      </option>
    ));
  return (
    <div className="center">
      <h1>Google Book Search</h1>

      <form id="form" onSubmit={(e) => handleSubmit(e)}>
        <legend />

        <label htmlFor="searchTerm">
          <input
            type="text"
            name="searchTerm"
            id="searchTerm"
            required
            aria-required="true"
            placeholder=""
            value={state.searchTerm}
            onChange={handleChange}
          />
        </label>
       
        <div className="select-container">
          <label htmlFor="printType">
            Print Type{" "}
            <select
              style={{
                display: "block",
                width: "100%",
                height: "100%",
                border: "1px solid #f2f2f2",
              }}
              id="printType"
              name="printType"
              value={state.printType}
              onChange={handleChange}
            >
              {printTypeOptions()}
            </select>
          </label>
          <label htmlFor="bookType">
            Book Type{" "}
            <select
              style={{
                display: "block",
                width: "100%",
                height: "100%",
                border: "1px solid #f2f2f2",
              }}
              id="bookType"
              name="bookType"
              value={state.bookType}
              onChange={handleChange}
            >
              {bookTypeOptions()}
            </select>
          </label>
        </div>
		<Button id="search">search</Button>

      </form>

      <p id="error-message" className="error-message">
        {state.error}
      </p>
    </div>
  );
};
