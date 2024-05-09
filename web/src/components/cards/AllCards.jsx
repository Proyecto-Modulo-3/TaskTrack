import React, { useContext, useEffect, useState } from 'react'
import { useReloadContext } from '../../contexts/reload.context'
import { useParams } from 'react-router-dom'
import AuthContext from '../../contexts/auth.context'
import { getCards } from '../../services/api.service'

function AllCards({ taskId, title }) {
    const [cards, setCards] = useState([])
    const { now } = useReloadContext()
    const { id } = useParams()

    const { userId } = useContext(AuthContext)

    useEffect(() => {
        async function fetchCards() {
            const query = {}
            if (id) query.id = id
            console.log(id)
            if (taskId) query.taskId = taskId
            if (title) query.title = title
            try {
                if (userId) {
                    const { data: fetchCards } = await getCards(id, taskId, query)
                    setCards(fetchCards)
                    console.log(fetchCards)
                }
            } catch (error) {
                console.error(error)
                setCards([])
            }
        }
        fetchCards()
    }, [id, taskId, title, now])

  return (

    <div className="d-flex justify-content-center">
      {/* <pre>{tasks && JSON.stringify(tasks)}</pre> */}
      {cards.map((card) => (
        <div key={card.id}>
            <div className="row m-1">
              <div className="col-md-12">
                <div className="card mb-2">
                  <div className="card-body">
                    <h5 className="card-title">{card.text}</h5>
                    {/* <button
                      onClick={() => handleDeleteTask(task.id)}
                      className="btn btn-danger me-3"
                    ><i className="fa fa-trash" aria-hidden="true"></i></button> */}
                  </div>
                </div>
              </div>
            </div>
        </div>
      ))}
    </div>
  )
}

export default AllCards