import { FC, useEffect, useRef } from "react";
import Button from "./Button";
import DateTimePickerWithCalendar from "./DateTimePickerWithCalendar";
import { dbGetAppointment, dbUpdateAppointment } from "../database/dbCmd";
import React from "react";

interface Appointment {
  gid: string;
  title: string;
  biz: string;
  location: string;
  date: Date;
  time: Date;
}

interface EditAppointmentProps {
  data: {
    gid: string;
    title: string;
    biz: string;
    location: string;
    date: Date;
    time: Date;
  } | null;
  setShowEditAppointment: React.Dispatch<React.SetStateAction<boolean>>;
  selectedDate: Date | null;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date | null>>;
  selectedTime: Date | null;
  setSelectedTime: React.Dispatch<React.SetStateAction<Date | null>>;
  setAppointments: React.Dispatch<React.SetStateAction<Appointment[]>>;
  setEditAppointment: React.Dispatch<React.SetStateAction<Appointment>>;
}

const EditAppointment: FC<EditAppointmentProps> = ({
  data,
  setShowEditAppointment,
  selectedDate,
  setSelectedDate,
  selectedTime,
  setSelectedTime,
  setAppointments,
  setEditAppointment,
}) => {
  const formRef = useRef<HTMLFormElement | null>(null);

  const [formData, setFormData] = React.useState({
    title: "",
    biz: "",
    location: "",
    date: "",
    time: "",
  });

  useEffect(() => {
    if (data) {
      setFormData({
        title: data.title || "",
        biz: data.biz || "",
        location: data.location || "",
        date: data.date ? data.date.toISOString() : "",
        time: data.time ? data.time.toISOString() : "",
      });

      setSelectedDate(data.date);
      setSelectedTime(data.date);
    }
  }, [data, setSelectedDate, setSelectedTime]);

  const handleDateTimeChange = (date: Date | null, time: Date | null) => {
    console.log("handleDateTimeChange", date, time);
    setSelectedDate(date);
    setSelectedTime(time);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updateData = { ...formData };

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

    const appointment = {
      title: updateData.title,
      biz: updateData.biz,
      location: updateData.location,
      date: selectedDate,
      time: selectedTime,
      link: "",
    };

    await dbUpdateAppointment(data.gid, appointment);

    const getAppointment = await dbGetAppointment(data.gid);
    console.log("getAppointment", getAppointment);

    setAppointments((prev) => {
      return [
        ...prev.filter((app) => app.gid !== getAppointment.gid),
        getAppointment,
      ];
    });

    if (formRef.current) {
      formRef.current.reset();
    }

    handleClose();
  };

  const handleClose = () => {
    setFormData({
      title: "",
      biz: "",
      location: "",
      date: "",
      time: "",
    });

    setSelectedDate(null);
    setSelectedTime(null);

    setEditAppointment(null);
    setShowEditAppointment(false);
  };

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full h-screen absolute z-auto bg-white">
      <div className="flex justify-between items-center p-4 bg-gray-200">
        <h1 className="text-3xl">Termin bearbeiten</h1>
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
          <label htmlFor="title" className="text-xl p-2">
            Titel
          </label>
          <input
            className="border-2 border-gray-300 rounded-md p-2 w-full"
            type="text"
            id="title"
            name="title"
            placeholder="Titel"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
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
            value={formData.biz}
            onChange={(e) => setFormData({ ...formData, biz: e.target.value })}
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
            value={formData.location}
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
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
            Termin bearbeiten
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditAppointment;
