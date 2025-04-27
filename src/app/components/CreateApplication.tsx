import { FC } from "react";
import {
  dbGetApplication,
  dbGetApplicationStatus,
  dbInsertApplication,
  dbInsertApplicationStatus,
} from "../database/dbCmd";
import Button from "./Button";
import { ApplicationData, ApplicationStatus } from "../database/dbTypes";

interface Application {
  gid: string;
  bizname: string;
  bizlocation: string;
  position: string;
  status: string;
  url: string;
}

interface CreateApplicationProps {
  setApplications: React.Dispatch<React.SetStateAction<Application[]>>;
  setShowApplication: React.Dispatch<React.SetStateAction<boolean>>;
  setStatus: React.Dispatch<React.SetStateAction<ApplicationStatus[]>>;
}

const CreateApplication: FC<CreateApplicationProps> = ({
  setApplications,
  setShowApplication,
  setStatus,
}) => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const applicationData: ApplicationData = {
      bizname: data.bizname as string,
      bizLocation: data.bizlocation as string,
      position: data.position as string,
      offeruri: data.url ? (data.url as string) : undefined,
    };

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

    console.log(data);

    const id = await dbInsertApplication(applicationData);
    const getApplication = await dbGetApplication(id);
    setApplications((prev) => [
      ...prev,
      { ...getApplication, status: "", url: "" } as Application,
    ]);

    // Status setzen

    const statusEnum = data.status as keyof typeof ApplicationStatus;

    await dbInsertApplicationStatus({
      status: statusEnum,
      id: getApplication.gid,
    });

    const getStatus = await dbGetApplicationStatus(id);

    setStatus((prev) => [...prev, getStatus as unknown as ApplicationStatus]);

    setShowApplication(false);

    form.reset();
  };

  return (
    <div className="w-full h-screen absolute z-auto bg-white">
      <div className="flex justify-between items-center p-4 bg-gray-200">
        <h1 className="text-3xl">Bewerbung erstellen</h1>
        <div>
          <Button
            onClick={() => {
              setShowApplication(false);
            }}
          >
            X
          </Button>
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        className="max-w-[80%] grid grid-cols-2 gap-4 p-4 m-auto mt-10"
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
            defaultValue=""
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
            Bewerbung erstellen
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateApplication;
