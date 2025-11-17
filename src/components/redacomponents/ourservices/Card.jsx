
import React from 'react'

import "./Card.css"

function WeddingCard({ iconSrc, title, children }) {
  return (
    <div className="mycard">
      {iconSrc && (
        <div className="mycard-icon">
          <img src={iconSrc} alt={title} className="icon-image" />
        </div>
      )}   
        {/* {iconSrc && (
      <div className="card-icon">{icon}</div> */}
      <h4 className="mycard-title">{title}</h4>
      <div className="mycard-body">{children}</div>
    </div>
  );
}

export default WeddingCard