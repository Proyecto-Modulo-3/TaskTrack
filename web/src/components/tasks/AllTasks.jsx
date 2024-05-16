import React, { useState, useEffect, useContext } from "react";
import { useReloadContext } from "../../contexts/reload.context";
import { getTasks, deleteTask, editTask } from "../../services/api.service";
import { useParams } from "react-router-dom";
import AuthContext from "../../contexts/auth.context";
import AddCard from "../cards/AddCard";
import "./AllTasks.css";
import AllCards from "../cards/AllCards";
import Card from "react-bootstrap/Card";

function AllTasks({ listId, title }) {
  const [tasks, setTasks] = useState([]);
  const [editedTaskId, setEditedTaskId] = useState(null);
  const { now, reload } = useReloadContext();
  const { id } = useParams();

  const { userId } = useContext(AuthContext);

  useEffect(() => {
    async function fetchTasks() {
      const query = {};
      if (title) query.title = title;
      if (listId) query.listId = listId;
      try {
        if (userId) {
          const { data: fetchTasks } = await getTasks(query, id);
          setTasks(
            fetchTasks.map((task) => ({ ...task, editedTitle: task.title }))
          );
        }
      } catch (error) {
        console.error(error);
        setTasks([]);
      }
    }
    fetchTasks();
  }, [listId, title, now]);

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(listId, taskId);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditTask = async (taskId) => {
    try {
      const taskToUpdate = tasks.find((task) => task.id === taskId);
      await editTask(listId, taskId, { title: taskToUpdate.editedTitle });
      setEditedTaskId(null);
      reload();
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (event, taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, editedTitle: event.target.value } : task
    );
    setTasks(updatedTasks);
  };

  const handleCardDragEnd = (listId, event) => {
    console.log(listId, event, event.cardId, event.target.getAttribute("id"));
  };

  return (
    <div className="m-2 d-flex justify-content-center">
      {tasks.map((task) => (
        <div key={task.id}>
          <Card border="dark" style={{ width: "20rem", margin: "5px" }}>
            <Card.Body>
              {editedTaskId === task.id ? (
                <div className="d-flex flex-column gap-2">
                  <input
                    type="text"
                    value={task.editedTitle}
                    onChange={(event) => handleInputChange(event, task.id)}
                  />
                  <button
                    className="btn btn-success"
                    onClick={() => handleEditTask(task.id)}
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div onDragEnd={(event) => handleCardDragEnd(listId, event)}>
                  <Card.Title
                    className="text-center title-cursor"
                    onClick={() => setEditedTaskId(task.id)}
                  >
                    {task.title}
                    <button
                      onClick={() => handleDeleteTask(task.id)}
                      className="btn"
                    >
                      <i className="fa fa-trash" aria-hidden="true"></i>
                    </button>
                  </Card.Title>
                  <Card.Header>
                    <AllCards taskId={task.id} />
                  </Card.Header>
                  <div className="text-center mt-3">
                    <AddCard taskId={task.id} />
                  </div>
                </div>
              )}
            </Card.Body>
          </Card>
        </div>
      ))}
    </div>
  );
}

export default AllTasks;
