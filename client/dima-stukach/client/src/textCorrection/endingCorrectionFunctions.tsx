import { MeetupStatusModel } from "../Models/Meetups/meetupStatusModel";
import {
  topicWordVariants,
  requestWordVariants,
  meetupWordVariants,
  draftWordVariants,
  confirmedWordVariants,
  pastWordVariants,
} from "./endingVariants";
import i18n from "i18next";

export const getCorrectDataWithNeedStatus = (
  meetupsCounter: number,
  meetupStatus: MeetupStatusModel
) => {
  let meetupStatusData = "";
  switch (meetupStatus) {
    case "REQUEST":
      meetupStatusData = correctionEndings(
        meetupsCounter,
        topicWordVariants,
        requestWordVariants
      );
      break;
    case "DRAFT":
      meetupStatusData = correctionEndings(
        meetupsCounter,
        meetupWordVariants,
        draftWordVariants
      );
      break;
    case "CONFIRMED":
      meetupStatusData = correctionEndings(
        meetupsCounter,
        meetupWordVariants,
        confirmedWordVariants
      );
      break;
    case "PAST":
      meetupStatusData = correctionEndings(
        meetupsCounter,
        meetupWordVariants,
        pastWordVariants
      );
      break;
  }
  return meetupStatusData;
};

const correctionEndings = (
  meetupsCounter: number,
  firstWordArray: Array<String>,
  secondWordArray: Array<String>
) => {
  const isSecondDigitOne = Math.trunc(meetupsCounter / 10) % 10 !== 1;
  let meetupStatusData =
    i18n.language === "rus"
      ? `${meetupsCounter} ${firstWordArray[0]} ${secondWordArray[0]}`
      : `${meetupsCounter} ${firstWordArray[4]} ${secondWordArray[3]}`;
  switch (meetupsCounter % 10) {
    case 1:
      if (isSecondDigitOne) {
        meetupStatusData =
          i18n.language === "rus"
            ? `${meetupsCounter} ${firstWordArray[1]} ${secondWordArray[1]}`
            : `${meetupsCounter} ${firstWordArray[3]} ${secondWordArray[3]}`;
      }
      break;
    case 2:
    case 3:
    case 4:
      if (isSecondDigitOne) {
        meetupStatusData =
          i18n.language === "rus"
            ? `${meetupsCounter} ${firstWordArray[2]} ${secondWordArray[2]}`
            : `${meetupsCounter} ${firstWordArray[4]} ${secondWordArray[3]}`;
      }
      break;
  }
  return meetupStatusData;
};
