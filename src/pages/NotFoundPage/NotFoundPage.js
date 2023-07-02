import React from 'react'
import { Link } from 'react-router-dom'
import { STATUS } from "../../utils/status";
import Loader from "../../components/Loader/Loader";
import Error from "../../components/Error/Error";
import { useSelector } from "react-redux";


const NotFoundPage = () => {
  const {status: loginStatus} = useSelector(state => state.auth)
  if (loginStatus === STATUS.ERROR) return <Error />;
  if (loginStatus === STATUS.LOADING) return <Loader />;
  return (
    <div>
       <div>
        <h2>404</h2>
        <p>Opppppsss, page not found.</p>
        <button className="--btn">
          <Link to="/">&larr; Back to Home Page</Link>
        </button>
      </div>
    </div>
  )
}

export default NotFoundPage
