import { useState, useEffect, useContext } from "react";
import { useReloadContext } from "../../contexts/reload.context";
import { getTasks, deleteTask } from "../../services/api.service";
import { useParams } from "react-router-dom";
import AuthContext from "../../contexts/auth.context";
import AddCard from "../cards/AddCard";
import "./AllTasks.css"
import AllCards from "../cards/AllCards";

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
    <div className="d-flex justify-content-between">
      {/* <pre>{tasks && JSON.stringify(tasks)}</pre> */}
      {tasks.map((task) => (
        <div key={task.id}>
            <div className="row m-1">
              <div className="col-md-12">
                <div className="card mb-2">
                  <div className="card-body">
                    <h5 className="card-title">{task.title}</h5>
                    <button
                      onClick={() => handleDeleteTask(task.id)}
                      className="btn btn-danger me-3"
                    ><i className="fa fa-trash" aria-hidden="true"></i></button>
                    <div className="mx-5"><AllCards taskId={id}/></div>
                    <AddCard />
                  </div>
                </div>
              </div>
            </div>
        </div>
      ))}
    </div>
  );
}

export default AllTasks;
