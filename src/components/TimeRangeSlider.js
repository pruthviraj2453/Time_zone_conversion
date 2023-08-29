import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";



const hours = Array.from({ length: 25 }, (_, i) => i); // 0 to 24
const minutes = ["00", "30"]; // 00 and 30

const marks = hours.map((hour) => ({
  value: hour * 60, // Convert hours to minutes
  label:
    hour % 3 === 0
      ? `${hour % 12 === 0 ? "12" : hour % 12} ${hour < 12 ? "AM" : "PM"}`
      : "", // Show label only on 3-hour intervals
}));

minutes.forEach((minute, index) => {
  marks.push({
    value: 24 * 60 + index * 30, // After 12 AM
  });
});

function valuetext(value) {
  const hour = Math.floor(value / 60);
  const minute = value % 60;
  const formattedHour = hour === 0 ? 12 : hour % 12;
  const period = hour < 12 || hour === 24 ? "AM" : "PM";
  return `${formattedHour === 0 ? 12 : formattedHour}:${
    minute === 0 ? "00" : minute
  } ${period}`;
}

export default function TimeRangeSlider({ selectedTime, setSelectedTime }) {
  const [sliderValue, setSliderValue] = React.useState(0);

  React.useEffect(() => {
    // Convert selectedTime to minutes and update the slider value
    const [selectedHour, selectedPeriod] = selectedTime.split(" ");
    let selectedHourIn24Format = parseInt(selectedHour);
    if (selectedPeriod === "PM" && selectedHourIn24Format !== 12) {
      selectedHourIn24Format += 12;
    } else if (selectedPeriod === "AM" && selectedHourIn24Format === 12) {
      selectedHourIn24Format = 0;
    }
    const selectedMinutesInMinutes = selectedHourIn24Format * 60;

    setSliderValue(selectedMinutesInMinutes);
  }, [selectedTime]);

  const handleSliderChange = (event, newValue) => {
    setSliderValue(newValue);
    console.log(newValue);

    // Convert slider value back to 12-hour format time
    const hours = Math.floor(newValue / 60);
    const minutes = newValue % 60;
    const period = hours < 12 || hours === 24 ? "AM" : "PM";
    const formattedHour = hours === 0 ? 12 : hours % 12;
    setSelectedTime(
      `${formattedHour}:${minutes === 0 ? "00" : minutes} ${period}`
      
    );
    console.log(selectedTime);
  };

  return (
    <Box sx={{ width: 700, paddingLeft: 10 }}>
      <Slider
        aria-label="Time range"
        value={sliderValue} // Use the updated slider value
        getAriaValueText={valuetext}
        valueLabelFormat={valuetext}
        step={15} // 30-minute intervals
        marks={marks}
        valueLabelDisplay="on"
        max={24 * 60} // 12:00 AM
        onChangeCommitted={handleSliderChange}
      />
    </Box>
  );
}
