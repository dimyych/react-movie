import React from "react";
import "./styles/Global.css";
import "./styles/Header.css";

const Header = (props) => {
  return (
    <div className="header">
      <div className="container">
        <h2 style={{cursor:'pointer'}} onClick={() => {
            props.setSearch('');
            props.nextPageMovie(1);
            props.setLikesVisible(false)
        }}>My movie</h2>
      </div>
    </div>
  );
};

export default Header;
