import {Component} from 'react'

import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'

import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import JobCard from '../JobCard'
import JobHeader from '../JobHeader'
import FilterGroup from '../FilterGroup'

import './index.css'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobsSection extends Component {
  state = {
    jobsList: [],
    profileData: [],
    apiStatus: apiStatusConstants.initial,
    searchInput: '',
    employmentTypeId: '',
    activeSalaryId: '',
  }

  componentDidMount() {
    this.getJobsList()
    this.renderProfileDetails()
  }

  getJobsList = async () => {
    const {searchInput, employmentTypeId, activeSalaryId} = this.state
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentTypeId}&minimum_package=${activeSalaryId}&search=${searchInput}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.jobs.map(job => ({
        companyLogoUrl: job.company_logo_url,
        employmentType: job.employment_type,
        jobDescription: job.job_description,
        id: job.id,
        location: job.location,
        rating: job.rating,
        title: job.title,
        packagePerAnnum: job.package_per_annum,
      }))
      this.setState({
        jobsList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderProfileDetails = async () => {
    const apiUrl = 'https://apis.ccbp.in/profile'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const profilesData = await response.json()
    const updatedProfile = [
      {
        name: profilesData.profile_details.name,
        profileImageUrl: profilesData.profile_details.profile_image_url,
        shortBio: profilesData.profile_details.short_bio,
      },
    ]
    this.setState({
      profileData: updatedProfile,
    })
  }

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="products-error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="products-failure-img"
      />
      <h1 className="product-failure-heading-text">
        Oops! Something Went Wrong
      </h1>
      <p className="products-failure-description">
        We are having some trouble processing your request. Please try again.
      </p>
      <Link to="/jobs">
        <button type="button" className="button">
          Retry
        </button>
      </Link>
    </div>
  )

  changeEmployment = employmentTypeId => {
    this.setState({employmentTypeId}, this.getJobsList)
  }

  changeSalary = activeSalaryId => {
    console.log(activeSalaryId)
    this.setState({activeSalaryId}, this.getJobsList)
  }

  onEnterSearchInput = event => {
    if (event.key === 'Enter') {
      this.getJobsList()
    }
  }

  onEnterSearchInputs = () => {
    this.getJobsList()
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  JobHeaderIn() {
    const {profileData} = this.state
    if (profileData.length) {
      const {name, profileImageUrl, shortBio} = profileData[0]
      return (
        <JobHeader
          name={name}
          profileImageUrl={profileImageUrl}
          shortBio={shortBio}
        />
      )
    }
    return null
  }

  renderJobsListView = () => {
    const {jobsList, searchInput, activeSalaryId, employmentTypeId} = this.state
    const shouldShowJobsList = jobsList.length > 0

    return (
      <div className="jobs-container">
        <div className="search-job-container">
          <div className="filter-container">
            {this.JobHeaderIn()}
            <hr className="hr-line" />
            <FilterGroup
              employmentTypesList={employmentTypesList}
              salaryRangesList={salaryRangesList}
              employmentTypeId={employmentTypeId}
              activeSalaryId={activeSalaryId}
              changeEmployment={this.changeEmployment}
              changeSalary={this.changeSalary}
            />
          </div>

          <div className="right-container">
            <div className="search-input-container">
              <input
                value={searchInput}
                type="search"
                className="search-input"
                placeholder="Search"
                onChange={this.onChangeSearchInput}
                onKeyDown={this.onEnterSearchInput}
              />
              <button
                type="button"
                testId="searchButton"
                onClick={this.onEnterSearchInputs}
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            <div className="jobs-container">
              {shouldShowJobsList ? (
                <ul className="jobs-list">
                  {jobsList.map(job => (
                    <JobCard jobData={job} key={job.id} />
                  ))}
                </ul>
              ) : (
                <div className="no-jobs-view">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
                    className="no-jobs-img"
                    alt="no jobs"
                  />
                  <h1 className="no-jobs-heading">No Products Found</h1>
                  <p className="no-jobs-description">
                    We could not find any products. Try other filters.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderAllJobs = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobsListView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return <div className="all-products-section">{this.renderAllJobs()}</div>
  }
}

export default JobsSection
