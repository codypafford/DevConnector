import React, { Fragment } from "react";
import { useLocation } from "react-router-dom";

const NotFound = () => {
  let location = useLocation();

  return (
    location.pathname !== "/" && (
      <Fragment>
        <h1 className="x-large text-primary">
          <i className="fas fa-exclamation-triangle"></i> Page Not Found
        </h1>
        <p className="large">Sorry, this page does not exist</p>
      </Fragment>
    )
  );
};

export default NotFound;
