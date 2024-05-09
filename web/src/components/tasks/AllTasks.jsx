import { useState, useEffect, useContext } from "react";
import { useReloadContext } from "../../contexts/reload.context";
import { getTasks, deleteTask } from "../../services/api.service";
import { useParams } from "react-router-dom";
import AuthContext from "../../contexts/auth.context";
import AddCard from "../cards/AddCard";
import "./AllTasks.css";
import AllCards from "../cards/AllCards";
import Card from "react-bootstrap/Card";

function AllTasks({ listId, title }) {
  const [tasks, setTasks] = useState([]);
  const { now } = useReloadContext();
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
          setTasks(fetchTasks);
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

  return (
    <div className="d-flex flex-wrap justify-content-center">
      {tasks.map((task) => (
        <div key={task.id} className="mx-2 mb-3">
          <Card border="dark" style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title className="text-center">{task.title}</Card.Title>
              <div>
                <AllCards taskId={id} />
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <AddCard />
                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className="btn btn-danger"
                >
                  <i className="fa fa-trash" aria-hidden="true"></i>
                </button>
              </div>
            </Card.Body>
          </Card>
        </div>
      ))}
    </div>
  );
}

export default AllTasks;
