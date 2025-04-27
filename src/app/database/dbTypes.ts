export interface IApplication {
  gid: string;
  bizname: string;
  bizlocation: string;
  position: string;
  positionlocation?: string;
  offeruri?: string;
  creationDate: Date;
  lastUpdate: Date;
}

export interface ApplicationData {
  bizname: string;
  bizLocation: string;
  position: string;
  offeruri?: string;
}

export interface ApplicationUpdate {
  bizname?: string;
  bizlocation?: string;
  position?: string;
  positionlocation?: string;
  offeruri?: string;
}

export interface IApplicationStatus {
  gid: string;
  status: ApplicationStatusKey;
  creationDate: Date;
  lastUpdate: Date;
  applicationId: string;
}

export interface ApplicationStatusData {
  status: ApplicationStatusKey;
  id: string;
}

export interface IApplicationStatusInsert {
  status: string;
  id: string;
}

export interface IApplicationNote {
  gid: string;
  note: string;
  creationDate: Date;
  lastUpdate: Date;
  applicationId: string;
}

export interface IAppointment {
  gid: string;
  title: string;
  biz: string;
  date: Date;
  time: Date;
  location: string;
  link: string;
  creationDate: Date;
  lastUpdate: Date;
}

export interface AppointmentData {
  title: string;
  biz: string;
  location: string;
  date: Date;
  time: Date;
  link: string;
}

export interface IAppointmentNote {
  gid: string;
  note: string;
  creationDate: Date;
  lastUpdate: Date;
  appointmentId: string;
}

export interface IApplicationStatusEnum {
  [key: string]: ApplicationStatusKey;
}

export enum ApplicationStatus {
  sent = "Gesendet",
  open = "Offen",
  interview = "Vorstellungsgespräch",
  offer = "Angebot",
  rejected = "Absage",
  accepted = "Zusage",
  canceled = "Abgebrochen",
  screening = "In Bearbeitung",
}

export type ApplicationStatusKey = keyof typeof ApplicationStatus;
