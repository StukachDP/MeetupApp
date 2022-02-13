import { MeetupPersonModel } from "./meetupPersonModel";
import { MeetupStatusModel } from "./meetupStatusModel";

export interface MeetupModel {
  id: string;
  modified: string;
  start: string;
  finish: string;
  author: MeetupPersonModel;
  speakers: Array<MeetupPersonModel>;
  subject: string;
  excerpt: string;
  place: string;
  goCount: number;
  status: MeetupStatusModel;
  isOver: boolean;
  image?: string;
}
