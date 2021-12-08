import React from "react";
import Swal from "sweetalert2";
import thermo_icon from "./../assets/thermo.png";
import moist_icon from "./../assets/moist.png";
import warning_icon from "./../assets/warning.png";
import { ColorConstant } from "../value/color_constant";
import { Constant } from "../value/constant";

function AlertPopup(sensor, title) {
  var imgSrc;
  switch (sensor) {
    case Constant.titleTemperature:
      imgSrc = thermo_icon;
      break;
    case Constant.titleMoist:
      imgSrc = moist_icon;
      break;
    case Constant.titleBothTemperatureMoist:
      imgSrc = warning_icon;
    default:
      break;
  }

  Swal.fire({
    title: title,
    imageUrl: imgSrc,
    imageWidth: 100,
    imageHeight: 100,
    imageAlt: "Custom image",
    confirmButtonColor: ColorConstant.mred,
    timer: Constant.timeSamplingData - 1000,
  });
}
export default AlertPopup;
