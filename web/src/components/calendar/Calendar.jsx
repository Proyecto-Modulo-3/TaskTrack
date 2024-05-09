import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import Sidebar from "../ui/SideBar";
import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function Calendar() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [taskTitle, setTaskTitle] = useState("");
  const [events, setEvents] = useState([]);

  const handleDateClick = (info) => {
    setSelectedDate(info.dateStr);
  };

  // Ver si podemos añadir la lógica del addTask del Board

  const handleAddTask = () => {
    if (taskTitle && selectedDate) {
      const newEvent = {
        title: taskTitle,
        start: selectedDate,
      };

      setEvents([...events, newEvent]);
      setTaskTitle("");
    }
  };

  const popover = (
    <Popover id="popover-basic">
      <Popover.Body>
        <Form>
          <Form.Group controlId="taskTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Give a title to your task"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" onClick={handleAddTask}>
            Add
          </Button>
        </Form>
      </Popover.Body>
    </Popover>
  );

  return (
    <>
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ flex: 1 }}>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView={"dayGridMonth"}
            headerToolbar={{
              start: "today prev,next",
              center: "title",
              end: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            height={"90vh"}
            selectable={true}
            dateClick={handleDateClick}
          />
          {selectedDate && (
            <div style={{ marginTop: "20px" }}>
              <OverlayTrigger
                trigger="click"
                placement="right"
                overlay={popover}
              >
                <Button variant="primary">Add task to {selectedDate}</Button>
              </OverlayTrigger>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Calendar;
