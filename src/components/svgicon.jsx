import React from "react";
//import { SvgProps } from 'react-native-svg';
import * as Icons from "@app/res/icons";

const SvgIcon = React.memo(({ name, fill }) => {
  const Comp = Icons[name];

  //console.log("SvgIcon rendered", name, fill);
  return <Comp fill={fill} />;
});

export default SvgIcon;
