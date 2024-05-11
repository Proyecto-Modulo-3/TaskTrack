import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import Sidebar from "../ui/SideBar";
import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { getLists } from "../../services/api.service";

function Calendar() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [taskTitle, setTaskTitle] = useState("");
  const [events, setEvents] = useState([]);
  const [lists, setLists] = useState([]);
  const [selectedList, setSelectedList] = useState("");

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const response = await getLists();
        setLists(response.data);
      } catch (error) {
        console.error("Error fetching lists:", error);
      }
    };

    fetchLists();
  }, []);

  const handleDateClick = (info) => {
    setSelectedDate(info.dateStr);
  };

  const handleAddTask = () => {
    if (taskTitle && selectedDate && selectedList) {
      const newEvent = {
        title: taskTitle,
        start: selectedDate,
        list: selectedList,
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
          <Form.Group controlId="listSelect">
            <Form.Label>Select List</Form.Label>
            <Form.Control
              as="select"
              value={selectedList}
              onChange={(e) => setSelectedList(e.target.value)}
            >
              <option value="">Select a list</option>
              {lists.map((list) => (
                <option key={list.id} value={list.id}>
                  {list.title}
                </option>
              ))}
            </Form.Control>
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
