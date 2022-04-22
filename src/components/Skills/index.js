import './index.css'

const Skills = props => {
  const {jobDetails} = props
  const {imageUrl, name} = jobDetails

  return (
    <>
      <li className="skills-container">
        <img alt="name" src={imageUrl} className="skills" key="image_url" />
        <p className="skill-heading" key="name">
          {name}
        </p>
      </li>
    </>
  )
}
export default Skills
