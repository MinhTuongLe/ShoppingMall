import React from 'react'
import { Link } from 'react-router-dom'
import { STATUS } from "../../utils/status";
import Loader from "../../components/Loader/Loader";
import Error from "../../components/Error/Error";
import { useSelector } from "react-redux";
import './NotFoundPage.scss'
import { Button } from 'react-bootstrap';

const NotFoundPage = () => {
  const {status: loginStatus} = useSelector(state => state.auth)
  if (loginStatus === STATUS.ERROR) return <Error />;
  if (loginStatus === STATUS.LOADING) return <Loader />;
  return (
    <div className='not-found-page'>
       <div>
        <h2>404</h2>
        <p>Opppppsss, page not found.</p>
        <Button>
          <Link className='button-text' to="/">&larr; Back to Home Page</Link>
        </Button>
      </div>
    </div>
  )
}

export default NotFoundPage
