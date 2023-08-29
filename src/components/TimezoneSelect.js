import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const timezones = [
  { value: "Etc/UTC", label: "UTC" },
  { value: "America/New_York", label: "New York" },
  { value: "America/Los_Angeles", label: "Los Angeles" },
  { value: "Europe/London", label: "London" },
  { value: "Asia/Tokyo", label: "Tokyo" },
  { value: "Australia/Sydney", label: "Sydney" },
  { value: "America/Chicago", label: "Chicago" },
  { value: "Europe/Paris", label: "Paris" },
  { value: "Asia/Dubai", label: "Dubai" },
  { value: "Asia/Kolkata", label: "Kolkata" },
  { value: "America/Toronto", label: "Toronto" },
  { value: "Asia/Katmandu", label: "Katmandu" },
  { value: "Asia/Kuala_Lumpur", label: "Kuala_Lumpur" },
  { value: "America/Qatar", label: "Qatar" },

  // Add more timezones as needed
];

export default function TimezoneSelect({ onUpdate }) {
  const [selectedTimezone, setSelectedTimezone] = React.useState("Etc/UTC"); // Default to UTC

  const handleChange = (event) => {
    setSelectedTimezone(event.target.value);
    if (onUpdate) {
      onUpdate(event.target.value); // Call the provided onUpdate function
    }
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="timezone-select-label">Timezone</InputLabel>
        <Select
          labelId="timezone-select-label"
          id="timezone-select"
          value={selectedTimezone}
          label="Timezone"
          onChange={handleChange}
        >
          {timezones.map((timezone) => (
            <MenuItem key={timezone.value} value={timezone.value}>
              {timezone.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
