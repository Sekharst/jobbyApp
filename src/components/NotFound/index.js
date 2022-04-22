import Header from '../Header'

import './index.css'

const NotFound = () => (
  <>
    <div className="not-found-bg-container">
      <Header />
      <div className="not-found-container">
        <img
          alt="not found"
          src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
          className="not-found-img"
        />
        <h1 className="not-found-heading">Page Not Found</h1>
        <p className="not-found-description">
          we\re sorry,the page you requested could not be found
        </p>
      </div>
    </div>
  </>
)

export default NotFound
