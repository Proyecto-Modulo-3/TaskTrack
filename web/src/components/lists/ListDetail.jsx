// Pillar las tasks de la lista (TaskDetail.jsx)
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { listDetails } from "../../services/api.service";

function ListDetail() {
  const { id } = useParams();
  const [list, setList] = useState();

  useEffect(() => {
    async function fetch() {
      try {
        const { data } = await listDetails(id);
        setList(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetch();
  }, [id]);
  
  return list && (
    <div>
      <h1>{list.title}</h1>
    </div>
  );
}

export default ListDetail;
