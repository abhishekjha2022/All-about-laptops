import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { getProducts } from "./apiCore";
import Card from "./Card";
import Search from "./Search";
import image1 from "./imag1.png";
import image2 from "./image2.png";
import image3 from "./image3.png";

import { Carousel } from "react-carousel-minimal";
import { Link } from "react-router-dom";
import { isAuthenticated, signout } from "../auth";
import Footer from "./footer";
import SearchBox from "./searchBox";

const Home = (props) => {
  const [productsBySell, setProductBySell] = useState([]);
  const [productsByArrival, setProductByArrival] = useState([]);
  const [error, setError] = useState(false);
  const { user } = isAuthenticated();

  const loadProductsBySell = () => {
    getProducts("sold").then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductBySell(data);
      }
    });
  };

  const loadProductsByArrival = () => {
    getProducts("createdAt").then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductByArrival(data);
      }
    });
  };

  useEffect(() => {
    loadProductsByArrival();
    loadProductsBySell();
  }, []);

  const data = [
    {
      image:
        "https://www.91-cdn.com/hub/wp-content/uploads/2022/07/Top-laptop-brands-in-India.jpg",
      caption: "Blazing fast speed",
    },
    {
      image:
        "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/mini-laptops-1647980699.jpg?crop=0.976xw:0.650xh;0.0160xw,0.181xh&resize=1200:*",
      caption: "ASUS",
    },
    {
      image:
        "https://i.pcmag.com/imagery/reviews/07FMJxND7Ck3AGe97FaZOek-1..v1640182987.jpg",
      caption: "Gaming Laptops",
    },
    {
      image:
        "https://149695847.v2.pressablecdn.com/wp-content/uploads/2022/07/laptop.jpg",
      caption: "Cool Laptops",
    },
  ];

  const captionStyle = {
    fontSize: "2em",
    fontWeight: "bold",
  };
  const slideNumberStyle = {
    fontSize: "20px",
    fontWeight: "bold",
  };

  return (
    <>
      <div className="App" style={{ backgroundColor: "#74d4e3" }}>
        <div style={{ textAlign: "center" }}>
          <img
            src={image3}
            height="150px"
            width="150px"
            style={{ borderRadius: "75px", backgroundColor: "blue" }}
          />
          <p
            style={{
              fontFamily: "fantasy",
              color: "blue",
              fontWeight: "bold",
              marginTop: "10px",
            }}
          >
            Review the best laptops for you!
          </p>
          <Search />

          <div
            style={{
              padding: "0 20px",
            }}
          >
            <ul
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
                listStyle: "none",
                cursor: "pointer",
                color: "lightcoral",
                fontWeight: "bold",
                fontFamily: "fantasy",
                fontSize: "30px",
                justifyContent: "flex-end",
              }}
            >
              <Link to="/" style={{ color: "lightcoral" }}>
                {" "}
                <li style={{ marginLeft: "35px" }}>Home</li>{" "}
              </Link>
              <Link to="/shop" style={{ color: "lightcoral" }}>
                <li style={{ marginLeft: "35px" }}>Requirements</li>{" "}
              </Link>
              {!user && (
                <>
                  <Link to="/signin" style={{ color: "lightcoral" }}>
                    {" "}
                    <li style={{ marginLeft: "35px" }}>Signin</li>
                  </Link>
                  <Link to="/signup" style={{ color: "lightcoral" }}>
                    {" "}
                    <li style={{ marginLeft: "35px" }}>Register</li>
                  </Link>
                </>
              )}
              {isAuthenticated() && (
                <li>
                  <span
                    onClick={() => signout(() => props.history.push("/"))}
                    style={{ cursor: "pointer", color: "lightcorel" }}
                  >
                    Signout
                  </span>
                </li>
              )}
            </ul>
            <Carousel
              data={data}
              time={1000}
              width="100%"
              height="500px"
              captionStyle={captionStyle}
              radius="10px"
              slideNumber={true}
              slideNumberStyle={slideNumberStyle}
              captionPosition="bottom"
              automatic={true}
              dots={true}
              pauseIconColor="white"
              pauseIconSize="40px"
              slideBackgroundColor="darkgrey"
              slideImageFit="cover"
              thumbnails={true}
              thumbnailWidth="100px"
              style={{
                textAlign: "center",
                maxWidth: "100%",
                maxHeight: "500px",
                margin: "40px auto",
              }}
            />
          </div>
        </div>
      </div>
      <div style={{ marginTop: "150px" }}>
        <h2
          className="mb-4"
          style={{ color: "blue", fontFamily: "fantasy", fontWeight: "bold" }}
        >
          New Arrivals
        </h2>
        <div className="row">
          {productsByArrival.map((product, i) => (
            <div key={i} className="col-4 mb-3">
              <Card product={product} />
            </div>
          ))}
        </div>
        <h2 className="mb-4">Best Sellers</h2>
        <div className="row">
          {productsBySell.map((product, i) => (
            <div key={i} className="col-4 mb-3">
              <Card product={product} />
            </div>
          ))}
        </div>
      </div>
      <img
        src={image1}
        height="500px"
        width="60%"
        style={{ marginLeft: "auto" }}
      />
      <img src={image2} height="500px" width="40%" />
      <Footer />
    </>
  );
};

export default Home;
