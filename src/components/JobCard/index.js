import {Link} from 'react-router-dom'

import {GoLocation} from 'react-icons/go'
import {CgToolbox} from 'react-icons/cg'
import {AiTwotoneStar} from 'react-icons/ai'

import './index.css'

const JobCard = props => {
  const {jobData} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
    packagePerAnnum,
    id,
  } = jobData

  return (
    <Link className="link" to={`/${id}`}>
      <li className="job-item" key={id}>
        <div className="logo-container">
          <img
            src={companyLogoUrl}
            alt="company logo"
            key="company_logo_url"
            className="logo"
          />
          <div>
            <h1 className="title" key="title">
              {title}
            </h1>
            <div className="star-rating">
              <AiTwotoneStar className="star" />
              <p className="rating" key="rating">
                {rating}
              </p>
            </div>
          </div>
        </div>
        <div className="loco-container">
          <div className="loco-type">
            <GoLocation className="location" />
            <p className="lo-cation" key="location">
              {location}
            </p>
            <CgToolbox className="location" />
            <p className="employ-type" key="employment_type">
              {employmentType}
            </p>
          </div>
          <p className="salary">Rs {packagePerAnnum}/-</p>
        </div>
        <hr className="hr-tag" />
        <h1 className="des-head">Description</h1>
        <p className="description" key="job_description">
          {jobDescription}
        </p>
      </li>
    </Link>
  )
}
export default JobCard
