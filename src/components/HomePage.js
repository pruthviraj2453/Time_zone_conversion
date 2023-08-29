import { Container, Grid, IconButton, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Add, Brightness4 } from "@mui/icons-material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import moment from "moment-timezone"; // Use 'moment-timezone' package for time zone support
import { useAppContext } from "../context"; // Import the context hook
import TimezoneSelect from "./TimezoneSelect";
import DraggableList from "./DraggableList";

export default function HomePage() {
  const [selectedTimezone, setSelectedTimezone] = useState("Etc/UTC");
  const [currentTimeZone, setCurrentTimeZone] = useState("Etc/UTC");
  const [selectedTime, setSelectedTime] = useState("12am");
  const [selectedDate, setSelectedDate] = useState();
  const [timezones, setTimezones] = useState([
    {
      id: "Etc/UTC",
      time: new Date().toISOString(),
    },
  ]);

  // Use the context hook to access the isDarkMode and toggleDarkMode
  const { isDarkMode, toggleDarkMode } = useAppContext();


  function changeTimeZone(fromTimezone, toTimezone, date, time) {
    // Combine date and time into a single Moment object
    const combinedDateTime = moment.tz(
      `${date} ${time}`,
      "MM/DD/YYYY hh:mm A",
      fromTimezone
    );

    // Convert to 'toTimezone'
    const convertedTimezone = combinedDateTime.clone().tz(toTimezone);

    return convertedTimezone.format("hh:mm A");
  }

  const handleAddTimezone = () => {
    setTimezones((prevTimezones) => [
      ...prevTimezones,
      {
        id: selectedTimezone, // Change this to a default timezone if needed
        time: changeTimeZone(
          currentTimeZone,
          selectedTimezone,
          selectedDate,
          selectedTime
        ),
      },
    ]);
  };

  useEffect(() => {
    setTimezones((prevTimezones) =>
      prevTimezones.map((timeZone) => {
        return {
          ...timeZone,
          time: changeTimeZone(
            currentTimeZone,
            selectedTimezone,
            selectedDate,
            selectedTime
          ),
        };
      })
    );
  }, [currentTimeZone, selectedTime]);

  return (
    <Container maxWidth>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h3">Timezone Converter</Typography>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{ display: "flex", gap: "10px", alignItems: "center" }}
        >

          {/* Date picker */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              value={selectedDate}
              label="Select date"
              onChange={(newDate) => {
                setSelectedDate(newDate.format("MM/DD/YYYY"));
              }}
            />
          </LocalizationProvider>

          {/* Timezone select */}
          <TimezoneSelect
            onUpdate={(tz) => {
              setSelectedTimezone(tz);
            }}
          />

          {/* Add timezone button */}
          <div>
            <IconButton
              aria-label="addTimeZone"
              color="secondary"
              onClick={handleAddTimezone}
            >
              <Add />
            </IconButton>
          </div>
          <IconButton
              aria-label="toggleDarkMode"
              onClick={toggleDarkMode}
              sx={{ color: "inherit" }}
            >
              <Brightness4 />
            </IconButton>
        </Grid>
      </Grid>
      {/* Draggable timezone list */}
      <DraggableList
        items={timezones}
        setItems={setTimezones}
        changeTime={(zone, time) => {
          setCurrentTimeZone(zone);

        }}
        setSelectedTime={setSelectedTime}
      />
    </Container>
  );
}
