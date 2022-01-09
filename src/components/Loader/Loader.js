import React from "react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import LoaderItem from "react-loader-spinner";

const Loader = () => {
  return (
    <div>
      <LoaderItem type="Audio" color="#00BFFF" height={80} width={80} />
    </div>
  );
};

export default Loader;
