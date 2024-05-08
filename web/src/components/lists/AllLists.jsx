import { useEffect, useState, useContext } from "react";
import { getLists } from "../../services/api.service";
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
        </div>
      ))}
    </div>
  );
}

export default AllLists;
