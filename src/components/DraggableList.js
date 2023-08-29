import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  CardHeader,
  IconButton,
  TextField,
} from "@mui/material";
import TimeRangeSlider from "./TimeRangeSlider";

const DraggableList = ({
  items,
  setItems,
  selectedTime,
  changeTime,
  setSelectedTime,
}) => {
  const [draggedIndex, setDraggedIndex] = useState(null);

  const handleDragStart = (event, index) => {
    event.dataTransfer.setData("index", index);
    setDraggedIndex(index);
    const draggedTime = items[index].time;
    setSelectedTime(draggedTime);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event, dropIndex) => {
    event.preventDefault();

    const draggedIndex = parseInt(event.dataTransfer.getData("index"), 10);
    const newItems = [...items];
    const [draggedItem] = newItems.splice(draggedIndex, 1);
    newItems.splice(dropIndex, 0, draggedItem);

    setItems(newItems);
    setDraggedIndex(null);
  };

  const handleDelete = (index) => {
    const newItems = items.filter((item, idx) => idx !== index);
    setItems(newItems);
  };

  return (
    <div>
      {items.map((item, index) => (
        <Card
          key={item.id}
          draggable
          onDragStart={(event) => handleDragStart(event, index)}
          onDragOver={handleDragOver}
          onDrop={(event) => handleDrop(event, index)}
          style={{
            backgroundColor: draggedIndex === index ? "white" : "#f0f0f0",
            marginBottom: "8px",
          }}
        >
          <CardHeader
            avatar={<DragIndicatorIcon />}
            title={item.id}
            action={
              <IconButton
                aria-label="delete"
                onClick={() => handleDelete(index)}
              >
                <CloseIcon />
              </IconButton>
            }
          />
          <CardContent sx={{ paddingLeft: "20px" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <TimeRangeSlider
                selectedTime={item.time}
                setSelectedTime={(newTime) => {
                  changeTime(item.id, newTime);
                }}
              />
              <TextField
                readOnly
                value={selectedTime}
                id="outlined-basic"
                label=""
                variant="outlined"
              />
              {item.time}
            </Box>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DraggableList;
