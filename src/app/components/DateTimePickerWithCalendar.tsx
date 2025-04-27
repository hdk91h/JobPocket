import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DateTimePickerProps {
  selectedDate: Date | null;
  selectedTime: Date | null;
  onDateTimeChange: (date: Date | null, time: Date | null) => void;
}

const DateTimePickerWithCalendar: React.FC<DateTimePickerProps> = ({
  selectedDate,
  selectedTime,
  onDateTimeChange,
}) => {
  const handleDateChange = (date: Date | null) => {
    onDateTimeChange(date, selectedTime);
  };

  const handleTimeChange = (time: Date | null) => {
    if (!time) return;

    // fallback: wenn selectedDate noch leer ist, nimm heutiges Datum
    const baseDate = selectedDate || new Date();

    const updatedDate = new Date(baseDate);
    updatedDate.setHours(time.getHours());
    updatedDate.setMinutes(time.getMinutes());
    updatedDate.setSeconds(0);
    updatedDate.setMilliseconds(0);

    onDateTimeChange(updatedDate, time);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 m-auto">
      {/* Datumsauswahl */}
      <div className="">
        <label htmlFor="date" className="block text-xl">
          Datum auswählen
        </label>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="dd/MM/yyyy"
          className="border-2 border-gray-300 rounded-md p-2 w-full"
          placeholderText="Wähle ein Datum"
        />
      </div>

      {/* Uhrzeitauswahl */}
      <div className="">
        <label htmlFor="time" className="block text-xl">
          Uhrzeit auswählen
        </label>
        <DatePicker
          selected={selectedTime}
          onChange={handleTimeChange}
          showTimeSelect
          showTimeSelectOnly
          timeFormat="HH:mm"
          timeIntervals={15}
          timeCaption="Uhrzeit"
          dateFormat="HH:mm"
          className="border-2 border-gray-300 rounded-md p-2 w-full"
          placeholderText="Wähle eine Uhrzeit"
        />
      </div>
    </div>
  );
};

export default DateTimePickerWithCalendar;
