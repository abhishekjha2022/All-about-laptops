import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { Link } from "react-router-dom";
import hero from "./coollaptops.png";

import Card from "./Card";
import { getCategories, getFilteredProducts } from "./apiCore";
import CheckBox from "./Checkbox";
import RadioBox from "./RadioBox";
import { prices } from "./fixedPrices";
import { isAuthenticated, signout } from "../auth";

const Shop = () => {
  const [myFilters, setMyFilters] = useState({
    filters: { category: [], price: [] },
  });
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(false);
  const [limit, setLimit] = useState(6);
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(0);
  const [filteredResults, setFilteredResults] = useState([0]);
  const { user } = isAuthenticated();

  const init = () => {
    getCategories().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  const loadFilteredResults = (newFilters) => {
    getFilteredProducts(skip, limit, newFilters).then((data) => {
      console.log(data);
      if (data.error) {
        setError(data.error);
      } else {
        setFilteredResults(data.data);
        setSize(data.size);
        setSkip(0);
      }
    });
  };
  const loadMore = () => {
    let toSkip = skip + limit;
    getFilteredProducts(toSkip, limit, myFilters.filters).then((data) => {
      console.log(data);
      if (data.error) {
        setError(data.error);
      } else {
        setFilteredResults([...filteredResults, ...data.data]);
        setSize(data.size);
        setSkip(toSkip);
      }
    });
  };

  const loadMoreButton = () => {
    return (
      size > 0 &&
      size >= limit && (
        <button onClick={loadMore} className="btn btn-warning mb-5">
          Load more
        </button>
      )
    );
  };

  useEffect(() => {
    init();
    loadFilteredResults(skip, limit, myFilters.filters);
  }, []);

  const handleFilters = (filters, filterBy) => {
    //console.log("SHOP", filters, filterBy);
    const newFilters = { ...myFilters };
    newFilters.filters[filterBy] = filters;
    if (filterBy === "price") {
      let priceValues = handlePrice(filters);
      newFilters.filters[filterBy] = priceValues;
    }

    loadFilteredResults(myFilters.filters);
    setMyFilters(newFilters);
  };

  const handlePrice = (value) => {
    const data = prices;
    let array = [];
    for (let key in data) {
      if (data[key]._id === parseInt(value)) {
        array = data[key].array;
      }
    }

    return array;
  };
  const isActive = (history, path) => {
    if (history.location.pathname === path) {
      return { color: "orange" };
    } else {
      return { color: "white" };
    }
  };
  return (
    <>
      <ul
        style={{
          marginTop: "20px",
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          listStyle: "none",
          cursor: "pointer",
          color: "lightcoral",
          fontWeight: "bold",
          fontFamily: "fantasy",
          fontSize: "20px",
        }}
      >
        <Link to="/" style={{ color: "lightcoral" }}>
          {" "}
          <li style={{ marginRight: "25px" }}>Home</li>{" "}
        </Link>
        <Link to="/shop" style={{ color: "lightcoral" }}>
          <li style={{ marginRight: "25px" }}>Requirements</li>{" "}
        </Link>
        {!user && (
          <>
            <Link to="/signin" style={{ color: "lightcoral" }}>
              {" "}
              <li style={{ marginRight: "25px" }}>Signin</li>
            </Link>
            <Link to="/signup" style={{ color: "lightcoral" }}>
              {" "}
              <li style={{ marginRight: "25px" }}>Register</li>
            </Link>
          </>
        )}
      </ul>
      <img src={hero} height="700px" width="100%" />

      <div className="row" style={{ backgroundColor: "lightgray" }}>
        <div className="col-4" style={{ marginTop: "100px" }}>
          <h4 style={{ marginLeft: "10px" }}>Filter by your requirements</h4>
          <ul>
            <CheckBox
              categories={categories}
              handleFilters={(filters) => handleFilters(filters, "category")}
            />
          </ul>
        </div>
        <div className="col-8">
          <h2 className="mb-4">Products</h2>
          <div className="row">
            {filteredResults.length !== 0 ? (
              filteredResults.map((product, i) => (
                <div key={i} className="col-4 mb-3">
                  <Card product={product} />
                </div>
              ))
            ) : (
              <div
                style={{
                  marginLeft: "50px",
                }}
              >
                <h6>No product found!</h6>
              </div>
            )}
          </div>
          <hr />
          {loadMoreButton()}
        </div>
      </div>
    </>
  );
};
export default Shop;
