import React, { useEffect } from "react";
import Button from "../components/Button";
import CreateApplication from "../components/CreateApplication";
import { ResponsivePie } from "@nivo/pie";
import {
  dbDeleteApplication,
  dbDeleteApplicationStatusWhereApplicationId,
  dbDeleteAppointment,
  dbGetApplications,
  dbGetApplicationStatuses,
  dbGetAppointments,
} from "../database/dbCmd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";
import EditApplication from "../components/EditApplication";
import Label from "../components/Label";
import CreateAppointment from "../components/CreateAppointment";
import EditAppointment from "../components/EditAppointment";
import { ResponsiveBar } from "@nivo/bar";

const Home: React.FC = () => {
  const [applications, setApplications] = React.useState([]);
  const [status, setStatus] = React.useState([]);
  const [appointments, setAppointments] = React.useState([]);

  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = React.useState<Date | null>(null);

  const [showCreateAppointment, setShowCreateAppointment] =
    React.useState(false);

  const [showEditAppointment, setShowEditAppointment] = React.useState(false);

  const [showCreateApplication, setShowCreateApplication] =
    React.useState(false);

  const [showEditApplication, setShowEditApplication] = React.useState(false);

  const [editApplication, setEditApplication] = React.useState(null);

  const [editAppointment, setEditAppointment] = React.useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedApplications = await dbGetApplications();

      setApplications(fetchedApplications);

      const fetchedStatus = await await dbGetApplicationStatuses();
      setStatus(fetchedStatus);

      const fetchedAppointments = await dbGetAppointments();

      const sortedAppointments = [...fetchedAppointments].sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );

      setAppointments(sortedAppointments);
    };

    fetchData();
  }, []);

  useEffect(() => {
    getApplicationStatus();
  }, [applications, status]);

  const getApplicationStatus = () => {
    return applications.map((app) => {
      const matching = status.find((s) => s.applicationId === app.gid);
      return {
        ...app,
        status: matching ? matching.status : "Unbekannt",
      };
    });
  };

  const deleteApplication = async (id) => {
    if (confirm("Bewerbung wirklich löschen?")) {
      // löschen aus State und aus DB

      const oldApplication = applications.filter(
        (application) => application.id === id
      )[0];

      // setzen Applications und löschen
      const newApplications = applications.filter(
        (application) => application.id !== id
      );

      setApplications(newApplications);
      await dbDeleteApplication(id);

      // löschen aus Status und DB

      const newStatus = status.filter(
        (applicationStatus) =>
          applicationStatus.applicationId !== oldApplication.gid
      );

      setStatus(newStatus);

      await dbDeleteApplicationStatusWhereApplicationId(oldApplication.gid);
    }
    return;
  };

  const newApplicationHandler = () => {
    if (!showCreateApplication) {
      setShowCreateApplication(true);
    } else {
      setShowCreateApplication(false);
    }
  };

  const editApplicationHandler = (application) => {
    setEditApplication(application);
    setShowEditApplication(true);
  };

  const newAppointmentHandler = () => {
    if (!showCreateAppointment) {
      setShowCreateAppointment(true);
    } else {
      setShowCreateAppointment(false);
    }
  };

  const deleteAppointment = async (id) => {
    // löschen aus State und aus DB

    if (confirm("Termin wirklich löschen?")) {
      const newAppointments = appointments.filter(
        (appointment) => appointment.id !== id
      );

      setAppointments(newAppointments);
      await dbDeleteAppointment(id);
    }
    return;
  };

  const editAppointmentHandler = (appointment) => {
    console.log(appointment);
    setEditAppointment(appointment);
    setShowEditAppointment(true);
  };

  const isMobile = () => {
    if (window.innerWidth < 768) {
      return true;
    } else {
      return false;
    }
  };

  const getAmountOfState = (stateName) => {
    switch (stateName) {
      case "interview":
        return status.filter(
          (stat) =>
            applications.some((app) => stat.applicationId === app.gid) &&
            stat.status == "interview"
        ).length;
      case "accepted":
        return status.filter(
          (stat) =>
            (applications.some((app) => stat.applicationId === app.gid) &&
              stat.status == "accepted") ||
            stat.status == "offer"
        ).length;
      case "rejected":
        return status.filter(
          (stat) =>
            (applications.some((app) => stat.applicationId === app.gid) &&
              stat.status == "rejected") ||
            stat.status == "canceled"
        ).length;
    }
  };

  // Daten für die Diagramme

  const pieData = [
    {
      id: "Offen",
      value: applications.length - getAmountOfState("rejected"),
      color: "#e6e6fa",
    },
    { id: "Zusage", value: getAmountOfState("accepted"), color: "#15803d" },
    {
      id: "Vorstellungsgespräch",
      value: getAmountOfState("interview"),
      color: "#a16207",
    },
    { id: "Absagen", value: getAmountOfState("rejected"), color: "#b91c1c" },
  ];

  const barData = [
    {
      status: "Offen",
      anzahl: applications.length - getAmountOfState("rejected"),
    },
    { status: "Zusage", anzahl: getAmountOfState("accepted") },
    { status: "Vorstellungsgespräch", anzahl: getAmountOfState("interview") },
    { status: "Absagen", anzahl: getAmountOfState("rejected") },
  ];

  return (
    <>
      <div className="w-full relative ">
        <div
          className={`w-full h-screen inset-0 fixed z-10 ${
            showCreateApplication ? "" : "hidden"
          }`}
        >
          <CreateApplication
            setApplications={setApplications}
            setShowApplication={setShowCreateApplication}
            setStatus={setStatus}
          />
        </div>

        <div
          className={`w-full h-screen inset-0 fixed z-10 ${
            showEditApplication ? "" : "hidden"
          }`}
        >
          <EditApplication
            data={editApplication}
            setShowEditApplication={setShowEditApplication}
            setApplications={setApplications}
            setStatus={setStatus}
            setEditApplication={setEditApplication}
          />
        </div>

        <div
          className={`w-full h-screen inset-0 fixed z-10 ${
            showCreateAppointment ? "" : "hidden"
          }`}
        >
          <CreateAppointment
            setShowAppointment={setShowCreateAppointment}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            selectedTime={selectedTime}
            setSelectedTime={setSelectedTime}
            setAppointments={setAppointments}
          />
        </div>

        <div
          className={`w-full h-screen inset-0 fixed z-10 ${
            showEditAppointment ? "" : "hidden"
          }`}
        >
          <EditAppointment
            data={editAppointment}
            setShowEditAppointment={setShowEditAppointment}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            selectedTime={selectedTime}
            setSelectedTime={setSelectedTime}
            setAppointments={setAppointments}
            setEditAppointment={setEditAppointment}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 m-5">
          <div className="border-2 border-gray-300 p-4 rounded-lg">
            <h3 className="text-sm font-semibold">Bewerbungen</h3>
            {applications.length < 1 ? (
              <p className="flex flex-row">0</p>
            ) : (
              <p className="text-3xl">
                <span>
                  {applications.length - getAmountOfState("rejected")}
                </span>
                <span className="text-base">/{applications.length}</span>
              </p>
            )}{" "}
          </div>
          <div className="border-2 border-gray-300 p-4 rounded-lg">
            <h3 className="text-sm font-semibold">Vorstellungsgespräch</h3>
            {applications.length < 1 ? (
              <p className="flex flex-row">0</p>
            ) : (
              <p className="text-3xl">
                <span> {getAmountOfState("interview")}</span>
                <span className="text-base">/{applications.length}</span>
              </p>
            )}{" "}
          </div>
          <div className="border-2 border-gray-300 p-4 rounded-lg">
            <h3 className="text-sm font-semibold">Zusage</h3>
            {applications.length < 1 ? (
              <p className="flex flex-row">0</p>
            ) : (
              <p className="text-3xl">
                <span>{getAmountOfState("accepted")}</span>
                <span className="text-base">/{applications.length}</span>
              </p>
            )}{" "}
          </div>
          <div className="border-2 border-gray-300 p-4 rounded-lg">
            <h3 className="text-sm font-semibold">Absage</h3>
            {applications.length < 1 ? (
              <p className="flex flex-row">0</p>
            ) : (
              <p className="text-3xl">
                <span>{getAmountOfState("rejected")}</span>
                <span className="text-base">/{applications.length}</span>
              </p>
            )}{" "}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 m-5">
          <div className="border-2 border-gray-300 p-4 rounded-lg">
            <h3 className="text-2xl font-semibold">Status</h3>
            <div>
              <div style={{ height: 400 }}>
                <ResponsivePie
                  data={pieData}
                  margin={{ top: 40, right: 120, bottom: 40, left: 80 }}
                  innerRadius={0.5}
                  padAngle={1}
                  cornerRadius={3}
                  colors={{ datum: "data.color" }}
                  borderWidth={1}
                  borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
                  arcLinkLabelsSkipAngle={10}
                  arcLinkLabelsDiagonalLength={5}
                  arcLinkLabelsStraightLength={1}
                  arcLinkLabelsTextColor="#333333"
                  arcLabelsSkipAngle={10}
                  arcLabelsTextColor={{
                    from: "color",
                    modifiers: [["darker", 2]],
                  }}
                  legends={[
                    {
                      anchor: "bottom",
                      direction: "row",
                      justify: false,
                      translateX: 80,
                      translateY: 25,
                      itemsSpacing: 10,
                      itemWidth: 120,
                      itemHeight: 0,
                      itemTextColor: "#555",
                      itemDirection: "left-to-right",
                      symbolSize: 12,
                      symbolShape: "circle",
                    },
                  ]}
                />
              </div>
            </div>
          </div>
          <div className="border-2 border-gray-300 p-4 rounded-lg">
            <h3 className="text-2xl font-semibold">Fortschritt</h3>
            <div>
              <div style={{ height: 400 }}>
                <ResponsiveBar
                  data={barData}
                  keys={["anzahl"]}
                  indexBy="status"
                  margin={{ top: 50, right: 50, bottom: 50, left: 60 }}
                  padding={0.3}
                  colors={{ scheme: "nivo" }}
                  axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: "",
                    legendPosition: "middle",
                    legendOffset: 32,
                  }}
                  axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: "Anzahl",
                    legendPosition: "middle",
                    legendOffset: -40,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 m-5 ">
          <div className="border-2 border-gray-300 p-4 rounded-lg">
            <div className="flex flex-row items-center gap-4 justify-between">
              <h3 className="text-2xl font-semibold">Bewerbungen</h3>
              <Button
                onClick={() => {
                  newApplicationHandler();
                }}
              >
                + Bewerbung hinzufügen
              </Button>
            </div>
            {applications.length < 1 ? (
              <p className="flex flex-row justify-center p-5">
                Noch keine Bewerbungen ...
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="table-auto w-full border-separate border-spacing-y-1 text-left">
                  <thead className="text-sm">
                    <tr>
                      <th className="px-2 py-2">Unternehmen</th>
                      <th className="px-2 py-2">Position</th>
                      <th className="px-2 py-2">Status</th>
                      <th className="px-2 py-2">Erstellt</th>
                      <th className="px-2 py-2"></th>
                    </tr>
                  </thead>
                  <tbody className="text-sm divide-y divide-gray-100">
                    {getApplicationStatus()
                      .sort(
                        (a, b) =>
                          new Date(a.creationDate).getTime() -
                          new Date(b.creationDate).getTime()
                      )
                      .map((application) => (
                        <tr
                          key={application.gid}
                          className="hover:bg-gray-50 border-t border-gray-200"
                        >
                          <td
                            className="px-2 py-2 max-w-[150px] truncate"
                            title={
                              application.bizname +
                              " - " +
                              application.bizlocation
                            }
                          >
                            {application.bizname}
                            <br />
                            <div
                              className="text-xs text-gray-500 truncate"
                              title={application.bizlocation}
                            >
                              {application.bizlocation}
                            </div>
                          </td>
                          <td
                            className="px-2 py-2 max-w-[150px] truncate"
                            title={application.position}
                          >
                            {application.position}
                          </td>
                          <td className="px-2 py-2 max-w-[20%] truncate">
                            <Label isMobile={isMobile()}>
                              {application.status}
                            </Label>
                          </td>
                          <td className="px-2 py-2">
                            {new Date(
                              application.creationDate
                            ).toLocaleDateString(["de-DE"], {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            })}
                          </td>
                          <td className="px-2 py-2 flex gap-2">
                            <button
                              title="Bearbeiten"
                              className="text-blue-600 hover:text-blue-800"
                              onClick={() => {
                                editApplicationHandler(application);
                              }}
                            >
                              <FontAwesomeIcon icon={faPen} />
                            </button>
                            <button
                              title="Löschen"
                              className="text-red-600 hover:text-red-800"
                              onClick={() => {
                                deleteApplication(application.id);
                              }}
                            >
                              <FontAwesomeIcon icon={faTrash} />
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          <div className="border-2 border-gray-300 p-4 rounded-lg">
            <div className="flex flex-row items-center gap-4 justify-between">
              <h3 className="text-2xl font-semibold">Termine</h3>
              <Button
                onClick={() => {
                  newAppointmentHandler();
                }}
              >
                + Termin hinzufügen
              </Button>
            </div>
            {appointments.length < 1 ? (
              <p className="flex flex-row justify-center p-5">
                Noch keine Termine ...
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="table-auto w-full border-separate border-spacing-y-1 text-left">
                  <thead className="text-sm">
                    <tr>
                      <th className="px-2 py-2">Titel</th>
                      <th className="px-2 py-2">Unternehmen</th>
                      <th className="px-2 py-2">Datum</th>
                      <th className="px-2 py-2">Uhrzeit</th>
                      <th className="px-2 py-2"></th>
                    </tr>
                  </thead>
                  <tbody className="text-sm divide-y divide-gray-100">
                    {appointments
                      .sort(
                        (a, b) =>
                          new Date(a.date).getTime() -
                          new Date(b.date).getTime()
                      )
                      .map((appointment) => (
                        <tr
                          key={appointment.gid}
                          className="hover:bg-gray-50 border-t border-gray-200"
                        >
                          <td
                            className="px-2 py-2 max-w-[150px] truncate"
                            title={appointment.title}
                          >
                            {appointment.title}
                            <br />
                            <div
                              className="text-xs text-gray-500 max-w-[150px] truncate"
                              title={appointment.location}
                            >
                              {appointment.location}
                            </div>
                          </td>
                          <td
                            className="px-2 py-2 max-w-[150px] truncate"
                            title={appointment.biz}
                          >
                            {appointment.biz}
                          </td>
                          <td className="px-2 py-2">
                            {appointment.date.toLocaleDateString(["de-DE"], {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            })}
                          </td>
                          <td className="px-2 py-2">
                            {appointment.date.toLocaleTimeString(["de-DE"], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </td>
                          <td className="px-2 py-2 flex gap-2">
                            <button
                              title="Bearbeiten"
                              className="text-blue-600 hover:text-blue-800"
                              onClick={() => {
                                editAppointmentHandler(appointment);
                              }}
                            >
                              <FontAwesomeIcon icon={faPen} />
                            </button>
                            <button
                              title="Löschen"
                              className="text-red-600 hover:text-red-800"
                              onClick={() => {
                                deleteAppointment(appointment.id);
                              }}
                            >
                              <FontAwesomeIcon icon={faTrash} />
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
