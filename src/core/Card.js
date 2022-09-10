import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import ShowImage from "./ShowImage";
import moment from "moment";
import { addItem, updateItem, removeItem } from "./cartHelpers";

const Card = ({
  product,
  showViewProductButton = true,
  showAddToCartButton = true,
  cartUpdate = false,
  showRemoveProductButton = false,
  setRun = (f) => f,
  run = undefined,
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);

  const showViewButton = (showViewProductButton) => {
    return (
      showViewProductButton && (
        <Link to={`/product/${product._id}`} className="mr-2">
          <button
            className="btn mt-2 mb-2"
            style={{ backgroundColor: "blue", color: "white" }}
          >
            View Product
          </button>
        </Link>
      )
    );
  };

  const shouldRedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  return (
    <div className="card" style={{ backgroundColor: "white" }}>
      <div
        className="card-header name"
        style={{ backgroundColor: "black", color: "white" }}
      >
        {product.name}
      </div>
      <div className="card-body">
        {shouldRedirect(redirect)}
        <ShowImage item={product} url="product" />
        <p className="lead mt-2" style={{ fontSize: "18px", color: "white" }}>
          {product.description ? product.description.substring(0, 100) : ""}
        </p>

        <br />

        {showViewButton(showViewProductButton)}
      </div>
    </div>
  );
};

export default Card;
