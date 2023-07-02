import React from 'react'
import { Link } from 'react-router-dom'
const NotFoundPage = () => {
  return (
    <div>
       <div>
        <h2>404</h2>
        <p>Opppppsss, page not found.</p>
        <button className="--btn">
          <Link to="/">&larr; Back To Home</Link>
        </button>
      </div>
    </div>
  )
}

export default NotFoundPage
