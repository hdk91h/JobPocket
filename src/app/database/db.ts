import Dexie from "dexie";
import {
  IApplication,
  IApplicationNote,
  IApplicationStatus,
  IAppointment,
  IAppointmentNote,
} from "./dbTypes";

class AppDatabase extends Dexie {
  application: Dexie.Table<IApplication, number>;
  applicationStatus: Dexie.Table<IApplicationStatus, number>;
  applicationNote: Dexie.Table<IApplicationNote, number>;
  appointment: Dexie.Table<IAppointment, number>;
  appointmentNote: Dexie.Table<IAppointmentNote, number>;

  constructor() {
    super("bewerbungstool-web");

    this.version(1).stores({
      application:
        "++id, gid, bizname, bizlocation, bizemail, bizphone, position, offeruri, creationDate, lastUpdate",
      applicationStatus:
        "++id, gid, status, creationDate, lastUpdate, applicationId",
      applicationNote:
        "++id, gid, note, creationDate, lastUpdate, applicationId",
      appointment:
        "++id, gid, title, biz, date, location, link, creationDate, lastUpdate",
      appointmentNote:
        "++id, gid, note, creationDate, lastUpdate, appointmentId",
    });
  }
}

export const db = new AppDatabase();
