import { FC } from "react";
import Button from "./Button";
import DateTimePickerWithCalendar from "./DateTimePickerWithCalendar";
import { dbGetAppointment, dbInsertAppointment } from "../database/dbCmd";
import { AppointmentData } from "../database/dbTypes";

interface Appointment {
  gid: string;
  title: string;
  biz: string;
  location: string;
  date: Date;
  time: Date;
}

interface CreateAppointmentProps {
  setAppointments: React.Dispatch<React.SetStateAction<Appointment[]>>;
  setShowAppointment: React.Dispatch<React.SetStateAction<boolean>>;
  selectedDate: Date | null;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date | null>>;
  selectedTime: Date | null;
  setSelectedTime: React.Dispatch<React.SetStateAction<Date | null>>;
}

const CreateAppointment: FC<CreateAppointmentProps> = ({
  setShowAppointment,
  selectedDate,
  setSelectedDate,
  selectedTime,
  setSelectedTime,
  setAppointments,
}) => {
  const handleDateTimeChange = (date: Date | null, time: Date | null) => {
    setSelectedDate(date);
    setSelectedTime(time);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const appointment: AppointmentData = {
      title: data.title as string, // explizit als string behandeln
      biz: data.biz as string,
      location: data.location as string,
      date: selectedDate!,
      time: selectedTime!,
      link: "", // Du kannst hier auch den Link aus dem Formular übernehmen, falls du einen hast
    };

    if (!data.title) {
      alert("Bitte Titel angeben");
      return;
    }

    if (!data.biz) {
      alert("Bitte Unternehmensname angeben");
      return;
    }

    if (!data.location) {
      alert("Bitte Ort angeben");
      return;
    }

    if (!selectedDate) {
      alert("Bitte Datum angeben");
      return;
    }

    if (!selectedTime) {
      alert("Bitte Uhrzeit angeben");
      return;
    }

    // Termin speichern ...

    const createAppointment = await dbInsertAppointment(appointment);

    const getAppointment = await dbGetAppointment(createAppointment);

    setAppointments((prev) => [...prev, getAppointment as Appointment]);

    form.reset();

    setShowAppointment(false);
  };

  return (
    <div className="w-full h-screen absolute z-auto bg-white">
      <div className="flex justify-between items-center p-4 bg-gray-200">
        <h1 className="text-3xl">Termin erstellen</h1>
        <div>
          <Button
            onClick={() => {
              setShowAppointment(false);
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
          <label htmlFor="title" className="text-xl p-2">
            Titel
          </label>
          <input
            className="border-2 border-gray-300 rounded-md p-2 w-full"
            type="text"
            id="title"
            name="title"
            placeholder="Titel"
          />
        </div>
        <div>
          <label htmlFor="biz" className="text-xl p-2">
            Firma
          </label>
          <input
            className="border-2 border-gray-300 rounded-md p-2 w-full"
            type="text"
            id="biz"
            name="biz"
            placeholder="Firmenname"
          />
        </div>
        <div>
          <label htmlFor="location" className="text-xl p-2">
            Ort
          </label>
          <input
            className="border-2 border-gray-300 rounded-md p-2 w-full"
            type="text"
            id="location"
            name="location"
            placeholder="Ort"
          />
        </div>
        <div className="">
          <DateTimePickerWithCalendar
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            onDateTimeChange={handleDateTimeChange}
          />
        </div>

        <div className="col-span-2 flex justify-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Termin erstellen
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateAppointment;
