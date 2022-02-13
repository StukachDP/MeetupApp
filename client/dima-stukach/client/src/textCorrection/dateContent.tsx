import {
  dayNamesEng,
  dayNamesRus,
  mounthNamesEng,
  mounthNamesRus,
} from "./dayMounthConst";
import i18n from "i18next";

export const getFormatDate = (date: Date) => {
  let resultDate = "";
  const dateDayName =
    i18n.language === "rus"
      ? dayNamesRus[date.getDay()]
      : dayNamesEng[date.getDay()];
  const dateDay = date.getDate();
  const dateMountName =
    i18n.language === "rus"
      ? mounthNamesRus[date.getMonth()]
      : mounthNamesEng[date.getMonth()];
  const dateYear = date.getFullYear();
  resultDate =
    dateDayName + ", " + dateDay + " " + dateMountName + ", " + dateYear;
  return resultDate;
};

export const getFormatTime = (startTime: Date, finishTime: Date) => {
  let resultTime = "";
  const startHour = startTime.getUTCHours();
  const startMinetes = startTime.getUTCMinutes();
  const finishHour = finishTime.getUTCHours();
  const finishMinetes = finishTime.getUTCMinutes();
  resultTime =
    startHour + "." + startMinetes + " — " + finishHour + "." + finishMinetes;
  return resultTime;
};
