import React from "react";

const Rating = ({ rating, readOnly = false }) => {
  const stars = [];
  const rounded = Math.round(rating * 2) / 2; // e.g. 4.5 → 4.5

  for (let i = 1; i <= 5; i++) {
    if (i <= rounded) {
      // full star
      stars.push(
        <i
          key={i}
          className="fa-solid fa-star"
          style={{ color: "#FFD700", width: "18px" }}
        ></i>
      );
    } else if (i - 0.5 === rounded) {
      // half star (solid version, not regular)
      stars.push(
        <i
          key={i}
          className="fa-solid fa-star-half-stroke"
          style={{ color: "#FFD700", width: "18px" }}
        ></i>
      );
    } else {
      // empty star
      stars.push(
        <i
          key={i}
          className="fa-regular fa-star"
          style={{ color: "#FFD700", width: "18px" }}
        ></i>
      );
    }
  }

  return (
    <>
      <style>
        {`
          .rate {
            display: flex;
            justify-content: center;
            gap: 2px;
          }

          .rate i {
            color: #FFD700;
            font-size: 1.1rem;
            line-height: 1;
            vertical-align: middle;
            width: 18px;
          }
        `}
      </style>

      <div className="rate">{stars}</div>
    </>
  );
};

export default Rating;
