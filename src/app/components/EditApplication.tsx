/* eslint-disable react-hooks/rules-of-hooks */
import { FC, useRef } from "react";
import Button from "./Button";
import React from "react";
import {
  dbGetApplication,
  dbGetApplicationStatus,
  dbUpdateApplicationByGid,
  dbUpdateApplicationStatus,
} from "../database/dbCmd";
import { ApplicationStatus } from "../database/dbTypes";

interface Application {
  gid: string;
  bizname: string;
  bizlocation: string;
  position: string;
  status: string;
  url: string;
}

interface ApplicationStatusIn {
  gid: string;
  status: string;
  creationDate: Date;
  lastUpdate: Date;
  applicationId: string;
}

interface EditApplicationProps {
  data: {
    gid: string;
    bizname: string;
    bizlocation: string;
    position: string;
    status: string;
    url: string;
  } | null;
  setShowEditApplication: React.Dispatch<React.SetStateAction<boolean>>;
  setApplications: React.Dispatch<React.SetStateAction<Application[]>>;
  setStatus: React.Dispatch<React.SetStateAction<ApplicationStatusIn[]>>;
  setEditApplication: React.Dispatch<React.SetStateAction<Application>>;
}

const EditApplication: FC<EditApplicationProps> = ({
  data,
  setShowEditApplication,
  setApplications,
  setStatus,
  setEditApplication,
}) => {
  if (!data) {
    return null;
  }

  const formRef = useRef<HTMLFormElement | null>(null);

  const [formData, setFormData] = React.useState({
    bizname: data.bizname || "",
    position: data.position || "",
    bizlocation: data.bizlocation || "",
    status: data.status || "",
    url: data.url || "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updateData = { ...formData };

    if (!data.bizname) {
      alert("Bitte Unternehmensname angeben");
      return;
    }

    if (!data.position) {
      alert("Bitte Position angeben");
      return;
    }

    if (!data.bizlocation) {
      alert("Bitte Ort angeben");
      return;
    }

    if (!data.status) {
      alert("Bitte Status angeben");
      return;
    }

    // Bewerbung speichern ...

    await dbUpdateApplicationByGid(data.gid, updateData);

    const getApplication = await dbGetApplication(data.gid);

    setApplications((prev) => [
      ...prev.filter((app) => app.gid !== getApplication.gid),
      getApplication as unknown as Application,
    ]);

    // Status setzen

    const state = await dbGetApplicationStatus(data.gid);

    const statusKey: keyof typeof ApplicationStatus =
      updateData.status as keyof typeof ApplicationStatus;

    await dbUpdateApplicationStatus(state.gid, {
      status: statusKey,
      id: state.gid,
    });

    const updatedStatus = await dbGetApplicationStatus(data.gid);

    setStatus((prev) => [
      ...prev.filter((status) => status.applicationId !== data.gid),
      updatedStatus,
    ]);

    if (formRef.current) {
      formRef.current.reset();
    }

    handleClose();
  };

  const handleClose = () => {
    setFormData({
      bizname: "",
      position: "",
      bizlocation: "",
      status: "",
      url: "",
    });

    setEditApplication(null);
    setShowEditApplication(false);
  };

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full h-screen absolute z-auto bg-white">
      <div className="flex justify-between items-center p-4 bg-gray-200">
        <h1 className="text-3xl">Edit Form</h1>
        <div>
          <Button
            onClick={() => {
              handleClose();
            }}
          >
            X
          </Button>
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        className="max-w-[80%] grid grid-cols-2 gap-4 p-4 m-auto mt-10"
        ref={formRef}
      >
        <div>
          <label htmlFor="bizname" className="text-xl p-2">
            Unternehmen
          </label>
          <input
            className="border-2 border-gray-300 rounded-md p-2 w-full"
            type="text"
            id="bizname"
            name="bizname"
            placeholder="Unternehmen Name"
            value={formData.bizname}
            onChange={(e) =>
              setFormData({ ...formData, bizname: e.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="position" className="text-xl p-2">
            Position
          </label>
          <input
            className="border-2 border-gray-300 rounded-md p-2 w-full"
            type="text"
            id="position"
            name="position"
            placeholder="Position Bezeichnung"
            value={formData.position}
            onChange={(e) =>
              setFormData({ ...formData, position: e.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="bizlocation" className="text-xl p-2">
            Ort
          </label>
          <input
            className="border-2 border-gray-300 rounded-md p-2 w-full"
            type="text"
            id="bizlocation"
            name="bizlocation"
            placeholder="Ort Bezeichnung (z.B. Berlin oder Remote)"
            value={formData.bizlocation}
            onChange={(e) =>
              setFormData({ ...formData, bizlocation: e.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="url" className="text-xl p-2">
            URL
          </label>
          <input
            className="border-2 border-gray-300 rounded-md p-2 w-full"
            type="text"
            id="url"
            name="url"
            placeholder="URL des Angebots"
            value={formData.url}
            onChange={(e) => setFormData({ ...formData, url: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="status" className="text-xl p-2">
            Status
          </label>
          <select
            className="border-2 border-gray-300 rounded-md p-2 w-full"
            id="status"
            name="status"
            value={formData.status}
            onChange={(e) =>
              setFormData({ ...formData, status: e.target.value })
            }
          >
            <option value="" disabled>
              Status auswählen
            </option>
            <option value="sent">Gesendet</option>
            <option value="open">Offen</option>
            <option value="interview">Vorstellungsgespräch</option>
            <option value="offer">Angebot</option>
            <option value="rejected">Abgelehnt</option>
            <option value="accepted">Zusage</option>
            <option value="canceled">Abgebrochen</option>
            <option value="screening">In Bearbeitung</option>
          </select>
        </div>
        <div className="col-span-2 flex justify-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Bewerbung bearbeiten
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditApplication;
