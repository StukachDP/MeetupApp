import { makeAutoObservable } from "mobx";
import { $host } from "../http";
import { MeetupModel } from "../Models/Meetups/meetupModel";
import { MeetupPersonModel } from "../Models/Meetups/meetupPersonModel";
import { UserModel } from "../Models/Users/userModel";
import { meetupStatus } from "../textCorrection/statusConst";

interface IsUserParticipantProps {
  meetupId: string;
  isParticipant: boolean;
}
export default class MeetupStore {
  meetups: Array<MeetupModel> | null = null;
  statusFilteredMeetups: Array<MeetupModel> | null = null;
  choosenByIdMeetup: MeetupModel | null = null;
  participants: Array<MeetupPersonModel> | null = null;
  isUserParticipant: Array<IsUserParticipantProps> | null = null;
  isUserParticipantExactly: IsUserParticipantProps | null = null;
  sendNewRequestFlag: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  async getMeetups() {
    try {
      const responseResult = await $host.get("/api/meetups/");
      if (responseResult.status === 200) {
        this.setMeetups(responseResult.data);
        this.getStatusFilteredMeetups();
        return true;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async getMeetupById(id: string | undefined) {
    try {
      if (id) {
        const searchingResult = await $host.get("/api/meetups/" + id);
        if (searchingResult.status === 200) {
          this.setChoosenByIdMeetup(searchingResult.data);
        }
        return true;
      }
    } catch (error) {
      return false;
    }
  }

  getStatusFilteredMeetups(selectedStatusNumber?: number) {
    const statusNumber = selectedStatusNumber ? selectedStatusNumber : 0;
    if (this.meetups !== null) {
      const filteredMeetups = this.meetups.filter(
        (meetup) => meetup.status === meetupStatus[statusNumber]
      );
      this.setStatusFilteredMeetups(filteredMeetups);
    } else {
      this.setStatusFilteredMeetups([]);
    }
  }

  async createMeetup(meetup: MeetupModel) {
    try {
      const responseResult = await $host.post("/api/meetups/", { ...meetup });
      if (responseResult.status === 200) {
        return true;
      }
    } catch (error) {
      return false;
    }
  }

  async editMeetup(meetup: MeetupModel) {
    try {
      const responseResult = await $host.put("/api/meetups/", { ...meetup });
      if (responseResult.status === 200) {
        return true;
      }
    } catch (error) {
      return false;
    }
  }

  async changeMeetupStatus() {
    if (this.choosenByIdMeetup) {
      if (this.choosenByIdMeetup.status !== meetupStatus[3]) {
        for (
          let checkingStatus = 0;
          checkingStatus < meetupStatus.length - 1;
          checkingStatus++
        ) {
          if (this.choosenByIdMeetup.status === meetupStatus[checkingStatus]) {
            let changingStatusMeetup = this.choosenByIdMeetup;
            changingStatusMeetup.status = meetupStatus[checkingStatus + 1];
            const isRequestDone = await this.editMeetup(changingStatusMeetup);
            if (isRequestDone) {
              return true;
            } else {
              return false;
            }
          }
        }
      }
    }
  }

  async deleteMeetup(id: string | undefined) {
    try {
      if (id) {
        const responseResult = await $host.delete("/api/meetups/" + id);
        if (responseResult.status === 200) {
          this.setSendNewRequestFlag();
          return true;
        }
      }
    } catch (error) {
      return false;
    }
  }

  async getParticipants(id: string | undefined) {
    try {
      if (id) {
        const responseResult = await $host.get(
          "/api/meetups/" + id + "/participants"
        );
        if (responseResult.status === 200) {
          this.setParticipants(responseResult.data);
          return true;
        }
      }
    } catch (error) {
      return false;
    }
  }

  async checkIsUserParticipant(userId: string | undefined) {
    const checkAnswerArray: Array<IsUserParticipantProps> = [];
    if (this.meetups && userId) {
      for (let index = 0; index < this.meetups.length; index++) {
        const meetupParticipants = await $host.get(
          "/api/meetups/" + this.meetups[index].id + "/participants"
        );
        let meetupId = this.meetups[index].id;
        let isParticipant = false;
        if (meetupParticipants.data.length > 0) {
          const result = meetupParticipants.data.find(
            (participant: { id: string; name: string; surname: string }) => {
              return participant.id === userId;
            }
          );
          if (result) {
            isParticipant = true;
          }
          checkAnswerArray.push({ meetupId, isParticipant });
        } else {
          checkAnswerArray.push({ meetupId, isParticipant });
        }
      }
    }
    this.setIsUserParticipant(checkAnswerArray);
  }

  findIsParticipant(meetupId: string | undefined) {
    if (meetupId && this.isUserParticipant) {
      const resultForMeetup = this.isUserParticipant.find(
        (isParticipantObject: IsUserParticipantProps) => {
          return isParticipantObject.meetupId === meetupId;
        }
      );
      if (resultForMeetup) {
        return resultForMeetup.isParticipant;
      } else {
        console.log("some mistake was");
      }
    }
  }

  async checkIsUserParticipantExactly(userId: string | undefined) {
    let checkAnswer: IsUserParticipantProps | null = null;
    if (this.choosenByIdMeetup && userId) {
      const meetupParticipants = await $host.get(
        "/api/meetups/" + this.choosenByIdMeetup.id + "/participants"
      );
      let meetupId = this.choosenByIdMeetup.id;
      let isParticipant = false;
      if (meetupParticipants.data.length > 0) {
        const result = meetupParticipants.data.find(
          (participant: { id: string; name: string; surname: string }) => {
            return participant.id === userId;
          }
        );
        if (result) {
          isParticipant = true;
        }
      }
      checkAnswer = { meetupId, isParticipant };
    }
    this.setIsUserParticipantExactly(checkAnswer);
  }

  async addParticipant(meetupId: string | undefined, user: UserModel | null) {
    try {
      if (meetupId && user && this.choosenByIdMeetup) {
        const responseResult = await $host.post(
          "/api/meetups/" + meetupId + "/participants",
          { user }
        );
        if (responseResult.status === 200) {
          let editRequest = this.choosenByIdMeetup;
          editRequest.goCount++;
          const responseResult = await $host.put("/api/meetups/", {
            ...editRequest,
          });
          if (responseResult) {
            this.setSendNewRequestFlag();
          }
        }
        if (responseResult.status === 400) {
          this.deleteParticipant(meetupId, user);
        }
        return true;
      }
    } catch (error) {
      return false;
    }
  }

  async deleteParticipant(
    meetupId: string | undefined,
    user: UserModel | null
  ) {
    try {
      if (meetupId && user && this.choosenByIdMeetup) {
        const responseResult = await $host.delete(
          "/api/meetups/" + meetupId + "/participants",
          { data: user }
        );
        if (responseResult.status === 200) {
          let editRequest = this.choosenByIdMeetup;
          editRequest.goCount++;
          const responseResult = await $host.put("/api/meetups/", {
            ...editRequest,
          });
          if (responseResult) {
            this.setSendNewRequestFlag();
          }
        }
        if (responseResult.status === 404) {
          this.addParticipant(meetupId, user);
        }
        if (responseResult.status === 400) {
          console.log("request is wrong");
        }
        return true;
      }
    } catch (error) {
      return false;
    }
  }

  setMeetups(meetupArray: Array<MeetupModel>) {
    this.meetups = meetupArray;
  }

  setStatusFilteredMeetups(filteredMeetups: Array<MeetupModel>) {
    this.statusFilteredMeetups = filteredMeetups;
  }

  setChoosenByIdMeetup(meetup: MeetupModel) {
    this.choosenByIdMeetup = meetup;
  }

  setParticipants(participantsArray: Array<MeetupPersonModel>) {
    this.participants = participantsArray;
  }

  setIsUserParticipant(
    checkAnswerArray: Array<{ meetupId: string; isParticipant: boolean }>
  ) {
    this.isUserParticipant = checkAnswerArray;
  }

  setIsUserParticipantExactly(checkAnswer: IsUserParticipantProps | null) {
    this.isUserParticipantExactly = checkAnswer;
  }

  setSendNewRequestFlag() {
    this.sendNewRequestFlag = !this.sendNewRequestFlag;
  }
}
