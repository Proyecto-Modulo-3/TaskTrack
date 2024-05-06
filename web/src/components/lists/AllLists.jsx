import { useEffect, useState } from "react";
import { getLists } from "../../services/api.service";
import { Link } from "react-router-dom";

function AllLists({ title, category }) {
  const [lists, setLists] = useState([]);

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
  }, [title, category]);

  return (
    <div>
      {lists.map((list) => (
        <div key={list.id}>
          <Link className="text-decoration-none" to={`/lists/${list.id}`}>{list.title}</Link>
        </div>
      ))}
    </div>
  );
}

export default AllLists;
