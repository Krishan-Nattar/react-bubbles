import React, { useState } from "react";
import { axiosWithAuth } from "./AxiosAuth";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  const getData = () => {
    axiosWithAuth()
      .get("/colors")
      .then(res => {
        setColorList(res.data);
      })
      .catch(err => {
        console.log(err.response);
      });
  };
  useState(() => {
    getData();
  }, []);

  return (
    <>
      <ColorList
        colors={colorList}
        updateColors={setColorList}
        getData={getData}
      />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
