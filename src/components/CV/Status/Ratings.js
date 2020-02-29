import React from "react";
export const RatingBar = ({ max, value, minimal, color }) => {
  const fixed = value > max ? max : value < 0 ? 0 : value;
  const scale = (100 * fixed) / max;

  return (
    <div
      style={{
        width: minimal ? "150px" : "250px",
        //maxWidth: "250px",
        backgroundColor: "#f1f1f1",
        textAlign: "center",
        color: "white"
      }}
    >
      <div
        style={{
          width: `${scale}%`,
          height: " 10px",
          backgroundColor: value === max ? "aquamarine" : color,
          transition: "all .4s ease-in-out"
        }}
      ></div>
    </div>
  );
};
/*export const RatingStar = ({ value }) => {
  const fixed = value > 5 ? 5 : value < 0 ? 0 : value;
  return <div> hey I am stars</div>;
};
*/
