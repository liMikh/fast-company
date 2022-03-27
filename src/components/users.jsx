import React, { useState } from 'react'
import api from '../api'

const Users = () => {
  //   console.log(api.users.fetchAll())
  const [users, setUsers] = useState(api.users.fetchAll())
  const handleDelete = (userId) => {
    setUsers((prevState) => prevState.filter((user) => user._id !== userId))
  }
  let phrase
  const renderPhrase = (number) => {
    if (number === 2 || number === 3 || number === 4) {
      phrase = 'человека тусанут'
    } else if (
      number > 20 &&
      (number % 10 === 2 || number % 10 === 3 || number % 10 === 4)
    ) {
      phrase = 'человека тусанут'
    } else {
      phrase = 'человек тусанёт'
    }
    return phrase
  }

  return (
    <>
      <h3>
        <span
          className={'badge ' + (users.length > 0 ? 'bg-primary' : 'bg-danger')}
        >
          {users.length > 0
            ? `${users.length} ${renderPhrase(users.length)} с тобой`
            : 'Никто с тобой не тусанёт'}
        </span>
      </h3>

      {users.length > 0 && (
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Имя</th>
              <th scope="col">Качество</th>
              <th scope="col">Професиия</th>
              <th scope="col">Встретился, раз</th>
              <th scope="col">Оценка</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>
                  {user.qualities.map((qual) => (
                    <span
                      className={'badge m-1 bg-' + qual.color}
                      key={qual._id}
                    >
                      {qual.name}
                    </span>
                  ))}
                </td>
                <td>{user.profession.name}</td>
                <td>{user.completedMeetings}</td>
                <td>{user.rate}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(user._id)}
                  >
                    delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  )
}

export default Users
