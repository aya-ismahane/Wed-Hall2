import React, { useState } from "react";
// import { Rate } from "antd";
import { Flex, Rate } from "antd";
import "./Rating.css";
const desc = ["terrible", "bad", "normal", "good", "wonderful"];

const Rating = ({ isAuth, setIsAuth }) => {
  const [value, setValue] = useState(3);

  return (
    <div>
      {isAuth ? (
        <Flex gap="middle" vertical className="rate">
          <Rate tooltips={desc} onChange={setValue} value={value} />
          {/* {value ? <span>{desc[value - 1]}</span> : null} */}
        </Flex>
      ) : (
        <>
          <Flex gap="middle" vertical className="rate">
            <Rate onChange={setValue} value={value} disabled />
            {/* {value ? <span>{desc[value - 1]}</span> : null} */}
          </Flex>
        </>
      )}
    </div>
  );
};

export default Rating;
