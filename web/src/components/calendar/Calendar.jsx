import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import Sidebar from "../ui/SideBar";
import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { getLists, createTask, getTasks } from "../../services/api.service";

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

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const events = [];
        for (const list of lists) {
          const { data: tasks } = await getTasks(null, list.id);
          for (const task of tasks) {
            events.push({
              title: task.title,
              date: task.date,
              list: list.id,
              color: list.color,
            });
          }
        }
        console.log(events);
        setEvents(events);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, [lists]);

  const handleDateClick = (info) => {
    setSelectedDate(info.dateStr);
  };

  const handleAddTask = async () => {
    if (taskTitle && selectedDate && selectedList) {
      try {
        await createTask(selectedList, {
          title: taskTitle,
          date: selectedDate,
        });

        const newEvent = {
          title: taskTitle,
          date: selectedDate,
          list: selectedList,
          color: lists.find((list) => list.id === selectedList).color,
        };
        setEvents([...events, newEvent]);

        setTaskTitle("");
        setSelectedDate(null);
        setSelectedList("");
      } catch (error) {
        console.error("Error creating task:", error);
      }
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
          <Form.Group controlId="taskDate">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="text"
              placeholder="Select a date to finish your task"
              value={selectedDate}
              onChange={(e) => setTaskDate(e.target.value)}
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
            events={events}
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
