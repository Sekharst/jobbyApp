import './index.css'

const JobHeader = props => {
  const {name, profileImageUrl, shortBio} = props

  return (
    <div className="profile-container">
      <img
        key="profile_image_url"
        src={profileImageUrl}
        alt="profile"
        className="profile"
      />
      <h1 className="name" key="name">
        {name}
      </h1>
      <p className="bio" key="short_bio">
        {shortBio}
      </p>
    </div>
  )
}

export default JobHeader
