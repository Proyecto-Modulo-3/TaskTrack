import React, { useContext, useEffect, useState } from "react";
import { useReloadContext } from "../../contexts/reload.context";
import { useParams } from "react-router-dom";
import AuthContext from "../../contexts/auth.context";
import { getCards, deleteCards } from "../../services/api.service";
import Card from "react-bootstrap/Card";

function AllCards({ taskId, title }) {
  const [cards, setCards] = useState([]);
  const { now } = useReloadContext();
  const { id } = useParams();

  const { userId } = useContext(AuthContext);

  useEffect(() => {
    async function fetchCards() {
      const query = {};
      if (id) query.id = id;
      if (taskId) query.taskId = taskId;
      if (title) query.title = title;
      try {
        if (userId) {
          const { data: fetchCards } = await getCards(id, taskId, query);
          setCards(fetchCards);
          console.log(fetchCards);
        }
      } catch (error) {
        console.error("Error fetching cards:", error);
        setCards([]);
      }
    }
    if (userId) fetchCards();
  }, [id, taskId, title, now, userId]);

  const handleDeleteCard = async (cardId) => {
    try {
      await handleDeleteCard(id, taskId);
      setTasks((prevCards) => prevCards.filter((card) => card.id !== cardId));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="d-flex flex-column">
      {/* <pre>{tasks && JSON.stringify(tasks)}</pre> */}
      {cards.map((card) => (
        <div key={card.id} style={{ marginBottom: "10px" }}>
          <Card border="dark" style={{ width: "15rem" }}>
            <Card.Body>
              <Card.Title className="text-center">{card.text}</Card.Title>
              {/* <button
                      onClick={() => handleDeleteCard(card.id)}
                      className="btn btn-danger me-3"
                    ><i className="fa fa-trash" aria-hidden="true"></i></button> */}
            </Card.Body>
          </Card>
        </div>
      ))}
    </div>
  );
}

export default AllCards;
