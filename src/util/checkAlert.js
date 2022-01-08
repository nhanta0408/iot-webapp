import React from "react";
import { Constant } from "../value/constant";
export function checkAlert(temperature, dissolveOxy, pH, salinity) {
  var tempIsAlertTemperature = 0;
  if (
    temperature > Constant.temperatureHighHigh ||
    temperature < Constant.temperatureLowLow
  ) {
    tempIsAlertTemperature = 2;
  } else if (
    temperature < Constant.temperatureHigh &&
    temperature > Constant.temperatureLow
  ) {
    tempIsAlertTemperature = 0;
  } else {
    tempIsAlertTemperature = 1;
  }

  //Đặc thù range của Oxy nó hơi khác
  var tempIsAlertDissolveOxy;
  if (dissolveOxy < Constant.dissolveOxyLowLow) {
    tempIsAlertDissolveOxy = 2;
  } else if (
    dissolveOxy > Constant.dissolveOxyLowLow &&
    dissolveOxy < Constant.dissolveOxyLow
  ) {
    tempIsAlertDissolveOxy = 1;
  } else {
    tempIsAlertDissolveOxy = 0;
  }

  var tempIsAlertSalinity = 0;
  if (
    salinity > Constant.salinityHighHigh ||
    salinity < Constant.salinityLowLow
  ) {
    tempIsAlertSalinity = 2;
  } else if (
    salinity < Constant.salinityHigh &&
    salinity > Constant.salinityLow
  ) {
    tempIsAlertSalinity = 0;
  } else {
    tempIsAlertSalinity = 1;
  }

  var tempIsAlertpH = 0;
  console.log("Trong check, temppH = ", pH);
  if (pH > Constant.pHHighHigh || pH < Constant.pHLowLow) {
    tempIsAlertpH = 2;
  } else if (pH < Constant.pHHigh && pH > Constant.pHLow) {
    tempIsAlertpH = 0;
  } else {
    tempIsAlertpH = 1;
  }
  return {
    isTemperatureAlert: tempIsAlertTemperature,
    isDissolveOxyAlert: tempIsAlertDissolveOxy,
    ispHAlert: tempIsAlertpH,
    isSalinityAlert: tempIsAlertSalinity,
  };
}
