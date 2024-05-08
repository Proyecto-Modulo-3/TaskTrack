// OPCION 1
// Pillar las tasks de la lista (TaskDetail.jsx)
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { listDetails } from "../../services/api.service";
import TasksForm from "../tasks/TasksForm";

function ListDetail() {
  const { id } = useParams();
  const [details, setDetails] = useState(null);
  const [error, setError] = useState(null);
  const [tasks, setTasks] = useState();

  useEffect(() => {
    async function fetch() {
      try {
        const { data } = await listDetails(id);
        setDetails(data);
      } catch (error) {
        setError("No tasks found.");
      }
    }
    fetch();
  }, [id]);

  const handleCreateTask = (data) => {
    console.log(tasks, data);
    setLists([...tasks, { ...data }]);
  };

  return (
    <>
      <div className="d-flex">
        <p>{details.title}</p>
        <TasksForm onCreate={handleCreateTask} />
        <button>
          {/* Llamar al handle de TaskForm () */}
          Add Task
        </button>
      </div>
    </>
  );
}

export default ListDetail;

// - onClick: función de get.lists.detail
