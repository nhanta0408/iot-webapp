import Swal from "sweetalert2";
import thermo_icon from "./../assets/thermo.png";
import dissolveOxy_icon from "./../assets/moist.png";
import warning_icon from "./../assets/warning.png";
import warning_red_icon from "./../assets/warning_red.png";
import { ColorConstant } from "../value/color_constant";
import { Constant } from "../value/constant";
import pop_mp3 from "./../assets/pop.mp3";
import error_mp3 from "./../assets/error.mp3";
function AlertPopup(sensor, title, isMute) {
  var imgSrc;
  let pop_audio = new Audio(error_mp3);
  switch (sensor) {
    case Constant.titleTemperature:
      imgSrc = thermo_icon;
      break;
    case Constant.titleDissolveOxy:
      imgSrc = dissolveOxy_icon;
      break;
    case Constant.redWarning:
      imgSrc = warning_red_icon;
      break;
    case Constant.yellowWarning:
      imgSrc = warning_icon;
      break;
    default:
      break;
  }
  if (!isMute) {
    pop_audio.play();
  }
  Swal.fire({
    title: title,
    imageUrl: imgSrc,
    imageWidth: 100,
    imageHeight: 100,
    imageAlt: "Custom image",
    confirmButtonColor: ColorConstant.mred,
    timer: Constant.timeSamplingData - 2000,
  });
}
export default AlertPopup;
