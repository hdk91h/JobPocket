import { db } from "./db";
import {
  ApplicationData,
  ApplicationStatusData,
  ApplicationUpdate,
  AppointmentData,
  IApplicationNote,
  IApplicationStatusInsert,
  IAppointmentNote,
} from "./dbTypes";

export const idGenerator = () => {
  const chars = "abcdef0123456789";

  let id = "";

  for (let i = 0; i < 32; i++) {
    id += chars[Math.floor(Math.random() * chars.length)];
  }

  return id;
};

export const dbInsertApplication = async (
  application: ApplicationData,
  gid = idGenerator()
) => {
  try {
    await db.application.add({
      gid: gid,
      bizname: application.bizname,
      bizlocation: application.bizLocation,
      position: application.position,
      //positionlocation: application.positionLocation,
      offeruri: application.offeruri,
      creationDate: new Date(),
      lastUpdate: new Date(),
    });

    return gid;
  } catch (error) {
    console.error("Error inserting application:", error);
    return null;
  }
};

export const dbGetApplication = async (gid: string) => {
  try {
    const application = await db.application.get({ gid: gid });
    return application;
  } catch (error) {
    console.error("Error getting application:", error);
    return null;
  }
};

export const dbGetApplications = async () => {
  try {
    const applications = await db.application.toArray();
    return applications;
  } catch (error) {
    console.error("Error getting applications:", error);
    return null;
  }
};

export const dbUpdateApplicationByGid = async (
  gid: string,
  application: ApplicationUpdate
) => {
  const count = await db.application.where("gid").equals(gid).modify({
    bizname: application.bizname,
    bizlocation: application.bizlocation,
    position: application.position,
    positionlocation: application.positionlocation,
    offeruri: application.offeruri,
    lastUpdate: new Date(),
  });
  console.log(`Modified ${count} row(s) by gid=${gid}`);
  return count;
};

export const dbDeleteApplication = async (gid: number) => {
  try {
    await db.application.delete(gid);
  } catch (error) {
    console.error("Error deleting application:", error);
  }
};

export const dbInsertApplicationStatus = async (
  status: IApplicationStatusInsert,
  gid = idGenerator()
) => {
  try {
    await db.applicationStatus.add({
      gid: gid,
      status: status.status as ApplicationStatusData["status"],
      creationDate: new Date(),
      lastUpdate: new Date(),
      applicationId: status.id,
    });

    return gid;
  } catch (error) {
    console.error("Error inserting application status:", error);
    return null;
  }
};

export const dbGetApplicationStatus = async (gid: string) => {
  try {
    const status = await db.applicationStatus.get({ applicationId: gid });
    return status;
  } catch (error) {
    console.error("Error getting application status:", error);
    return null;
  }
};

export const dbGetApplicationStatuses = async () => {
  try {
    const statuses = await db.applicationStatus.toArray();
    return statuses;
  } catch (error) {
    console.error("Error getting application statuses:", error);
    return null;
  }
};

export const dbUpdateApplicationStatus = async (
  gid: string,
  status: ApplicationStatusData
) => {
  try {
    await db.applicationStatus.where("gid").equals(gid).modify({
      status: status.status,
      lastUpdate: new Date(),
    });
  } catch (error) {
    console.error("Error updating application status:", error);
  }
};

export const dbDeleteApplicationStatus = async (gid: number) => {
  try {
    await db.applicationStatus.delete(gid);
  } catch (error) {
    console.error("Error deleting application status:", error);
  }
};

export const dbDeleteApplicationStatusWhereApplicationId = async (
  gid: string
) => {
  try {
    const deletedCount: number = await db.applicationStatus
      .where("applicationId")
      .equals(gid)
      .delete();

    return deletedCount;
  } catch (error) {
    console.error("Error deleting application status:", error);
    throw error;
  }
};

export const dbInsertApplicationNote = async (
  note: IApplicationNote,
  gid = idGenerator()
) => {
  try {
    await db.applicationNote.add({
      gid: gid,
      note: note.note,
      creationDate: new Date(),
      lastUpdate: new Date(),
      applicationId: note.applicationId,
    });

    return gid;
  } catch (error) {
    console.error("Error inserting application note:", error);
    return null;
  }
};

export const dbGetApplicationNote = async (gid: string) => {
  try {
    const note = await db.applicationNote.get({ gid: gid });
    return note;
  } catch (error) {
    console.error("Error getting application note:", error);
    return null;
  }
};

export const dbGetApplicationNotes = async () => {
  try {
    const notes = await db.applicationNote.toArray();
    return notes;
  } catch (error) {
    console.error("Error getting application notes:", error);
    return null;
  }
};

export const dbUpdateApplicationNote = async (
  gid: number,
  note: IApplicationNote
) => {
  try {
    await db.applicationNote.update(gid, {
      note: note.note,
      lastUpdate: new Date(),
    });
  } catch (error) {
    console.error("Error updating application note:", error);
  }
};

export const dbDeleteApplicationNote = async (gid: number) => {
  try {
    await db.applicationNote.delete(gid);
  } catch (error) {
    console.error("Error deleting application note:", error);
  }
};

export const dbInsertAppointment = async (
  appointment: AppointmentData,
  gid = idGenerator()
) => {
  try {
    await db.appointment.add({
      gid: gid,
      title: appointment.title,
      biz: appointment.biz,
      date: appointment.date,
      time: appointment.time,
      location: appointment.location,
      link: appointment.link,
      creationDate: new Date(),
      lastUpdate: new Date(),
    });

    return gid;
  } catch (error) {
    console.error("Error inserting appointment:", error);
    return null;
  }
};

export const dbGetAppointment = async (gid: string) => {
  try {
    const appointment = await db.appointment.get({ gid: gid });
    return appointment;
  } catch (error) {
    console.error("Error getting appointment:", error);
    return null;
  }
};

export const dbGetAppointments = async () => {
  try {
    const appointments = await db.appointment.toArray();
    return appointments;
  } catch (error) {
    console.error("Error getting appointments:", error);
    return null;
  }
};

export const dbUpdateAppointment = async (
  gid: string,
  appointment: AppointmentData
) => {
  try {
    await db.appointment.where("gid").equals(gid).modify({
      date: appointment.date,
      //time: appointment.time,
      title: appointment.title,
      biz: appointment.biz,
      location: appointment.location,
      link: appointment.link,
      lastUpdate: new Date(),
    });
  } catch (error) {
    console.error("Error updating appointment:", error);
  }
};

export const dbDeleteAppointment = async (gid: number) => {
  try {
    await db.appointment.delete(gid);
  } catch (error) {
    console.error("Error deleting appointment:", error);
  }
};

export const dbInsertAppointmentNote = async (
  note: IAppointmentNote,
  gid = idGenerator()
) => {
  try {
    await db.appointmentNote.add({
      gid: gid,
      note: note.note,
      creationDate: new Date(),
      lastUpdate: new Date(),
      appointmentId: note.appointmentId,
    });

    return gid;
  } catch (error) {
    console.error("Error inserting appointment note:", error);
    return null;
  }
};

export const dbGetAppointmentNote = async (gid: string) => {
  try {
    const note = await db.appointmentNote.get({ gid: gid });
    return note;
  } catch (error) {
    console.error("Error getting appointment note:", error);
    return null;
  }
};

export const dbGetAppointmentNotes = async () => {
  try {
    const notes = await db.appointmentNote.toArray();
    return notes;
  } catch (error) {
    console.error("Error getting appointment notes:", error);
    return null;
  }
};

export const dbUpdateAppointmentNote = async (
  gid: number,
  note: IAppointmentNote
) => {
  try {
    await db.appointmentNote.update(gid, {
      note: note.note,
      lastUpdate: new Date(),
    });
  } catch (error) {
    console.error("Error updating appointment note:", error);
  }
};

export const dbDeleteAppointmentNote = async (gid: number) => {
  try {
    await db.appointmentNote.delete(gid);
  } catch (error) {
    console.error("Error deleting appointment note:", error);
  }
};

export const dbDeleteAll = async () => {
  try {
    await db.application.clear();
    await db.applicationStatus.clear();
    await db.applicationNote.clear();
    await db.appointment.clear();
    await db.appointmentNote.clear();
  } catch (error) {
    console.error("Error deleting all data:", error);
  }
};

export const dbGetAll = async () => {
  try {
    const applications = await db.application.toArray();
    const applicationStatuses = await db.applicationStatus.toArray();
    const applicationNotes = await db.applicationNote.toArray();
    const appointments = await db.appointment.toArray();
    const appointmentNotes = await db.appointmentNote.toArray();

    return {
      applications,
      applicationStatuses,
      applicationNotes,
      appointments,
      appointmentNotes,
    };
  } catch (error) {
    console.error("Error getting all data:", error);
    return null;
  }
};
