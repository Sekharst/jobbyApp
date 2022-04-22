import {Component} from 'react'
import {AiTwotoneStar} from 'react-icons/ai'
import {GoLocation} from 'react-icons/go'
import {CgToolbox} from 'react-icons/cg'
import {FiExternalLink} from 'react-icons/fi'
import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'

import Skills from '../Skills'
import Header from '../Header'
import SimilarJobs from '../SimilarJobs'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobDetails extends Component {
  state = {
    jobData: '',
    similarJobsData: [],
    skillsData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobData()
  }

  getFormattedJobData = data => ({
    companyLogoUrl: data.job_details.company_logo_url,
    companyWebsiteUrl: data.job_details.company_website_url,
    employmentType: data.job_details.employment_type,
    id: data.job_details.id,
    jobDescription: data.job_details.job_description,
    location: data.job_details.location,
    packagePerAnnum: data.job_details.package_per_annum,
    rating: data.job_details.rating,
    title: data.job_details.title,
    description: data.job_details.life_at_company.description,
    imageUrl: data.job_details.life_at_company.image_url,
  })

  getFormatSimilarJobData = data => ({
    companyLogoUrl: data.company_logo_url,
    employmentType: data.employment_type,
    id: data.id,
    jobDescription: data.job_description,
    location: data.location,
    rating: data.rating,
    title: data.title,
  })

  getFormatSkillData = data => ({
    imageUrl: data.image_url,
    name: data.name,
  })

  getJobData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const jobData = await response.json()

    const updatedData = this.getFormattedJobData(jobData)

    const updatedSimilarJobsData = jobData.similar_jobs.map(eachSimilarJobs =>
      this.getFormatSimilarJobData(eachSimilarJobs),
    )

    const updatedSkillsData = jobData.job_details.skills.map(eachSkill =>
      this.getFormatSkillData(eachSkill),
    )
    this.setState({
      jobData: updatedData,
      similarJobsData: updatedSimilarJobsData,
      skillsData: [...updatedSkillsData],
      apiStatus: apiStatusConstants.success,
    })
    // console.log(updatedData)
    if (response.status === 404) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoadingView = () => (
    <div className="products-details-loader-container" testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="products-error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
        alt="products failure"
        className="products-failure-img"
      />
      <h1 className="product-failure-heading-text">
        Oops! Something Went Wrong
      </h1>
      <p className="products-failure-description">
        We are having some trouble processing your request. Please try again.
      </p>
    </div>
  )

  renderJobDetailsView = () => {
    const {jobData, similarJobsData, skillsData} = this.state
    const {
      companyLogoUrl,
      rating,
      companyWebsiteUrl,
      title,
      location,
      employmentType,
      packagePerAnnum,
      jobDescription,
      description,
      imageUrl,
    } = jobData

    return (
      <>
        <div className="job-details-container">
          <div className="logo-head-rating">
            <img
              alt="website logo"
              src={companyLogoUrl}
              className="comp-logo"
              key="company_logo_url"
            />
            <div className="head-star-container">
              <h1 className="job-heading" key="title">
                {title}
              </h1>
              <div className="star-rating">
                <AiTwotoneStar className="star" />
                <p className=" rating" key="rating">
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
            <p className="salary" key="package_per_annum">
              Rs {packagePerAnnum}/-
            </p>
          </div>
          <hr className="hr-tag" />
          <div className="link-container">
            <h1 className="des-head">Description</h1>
            <div>
              <a
                className="visit"
                key="company_website_url"
                href={companyWebsiteUrl}
              >
                Visit
                <FiExternalLink className="link" />
              </a>
            </div>
          </div>
          <p className="description" key="job_description">
            {jobDescription}
          </p>
          <h1 className="skills-heading">Skills</h1>
          <ul className="skills-list">
            {skillsData.map(eachSkill => (
              <Skills jobDetails={eachSkill} />
            ))}
          </ul>
          <h1 className="life-heading" key="description">
            Life at Company
          </h1>
          <div className="life-container">
            <p className="life-of-description" key="job_description">
              {description}
            </p>
            <img
              src={imageUrl}
              className="company-img"
              alt="life at company"
              value="company_logo_url"
              key="image_url"
            />
          </div>
        </div>
        <div className="similar-job-container">
          <h1 className="similar-heading">Similar Jobs</h1>

          <ul className="similar-list">
            {similarJobsData.map(eachJob => (
              <SimilarJobs similarJobsDetails={eachJob} />
            ))}
          </ul>
        </div>
      </>
    )
  }

  renderJobsDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobDetailsView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <div className="job-page-container">
          <Header />
          <div className="details-container">{this.renderJobsDetails()}</div>
        </div>
      </>
    )
  }
}

export default JobDetails
