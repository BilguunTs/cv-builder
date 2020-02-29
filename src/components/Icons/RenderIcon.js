import React from "react";
import { block_types } from "../../Context/config";
import { connect } from "../../Context";
import {
  FaGraduationCap,
  FaBriefcase,
  FaPuzzlePiece,
  FaFontAwesomeFlag,
  FaUserAlt,
  FaMapPin
} from "react-icons/fa";

export const RenderIcon = (type, size, gC) => {
  let color = gC;

  let Size = size !== null && size !== undefined ? size : 30;
  switch (type) {
    case block_types.main.Education:
      return <FaGraduationCap size={Size} color={color} />;
    case block_types.main.Work_History:
      return <FaBriefcase size={Size} color={color} />;
    case block_types.main.Skills:
      return <FaPuzzlePiece size={Size} color={color} />;
    case block_types.additional.language:
      return <FaFontAwesomeFlag size={Size} color={color} />;
    case block_types.main.Contact:
      return <FaUserAlt size={Size} color={color} />;
    default:
      return <FaMapPin size={Size} color={color} />;
  }
};
