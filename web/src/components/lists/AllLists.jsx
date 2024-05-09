import { useEffect, useState, useContext } from "react";
import { getLists, deleteList } from "../../services/api.service";
import { useNavigate } from "react-router-dom";
import { useReloadContext } from "../../contexts/reload.context";

function AllLists({ title, category }) {
  const [lists, setLists] = useState([]);
  const navigate = useNavigate();
  const { now } = useReloadContext();

  useEffect(() => {
    async function fetchLists() {
      const query = {};
      if (title) query.title = title;
      if (category) query.category = category;
      try {
        const { data: fetchLists } = await getLists(query);
        setLists(fetchLists);
      } catch (error) {
        console.error(error);
      }
    }
    fetchLists();
  }, [title, category, now]);

  const handleDeleteList = async (listId) => {
    try {
      await deleteList(listId);
      setLists((prevLists) => prevLists.filter((list) => list.id !== listId));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {lists.map((list) => (
        <div key={list.id}>
          <button
            onClick={() => {
              navigate(`/lists/${list.id}`);
            }}
          >
            {list.title}
          </button>
          <button
            onClick={() => handleDeleteList(list.id)}
            className="btn btn-danger"
          >
            <i className="fa fa-trash" aria-hidden="true"></i>
          </button>
        </div>
      ))}
    </div>
  );
}

export default AllLists;
