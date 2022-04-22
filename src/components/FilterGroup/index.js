import './index.css'

const FilterGroup = props => {
  const renderSalaryRangeList = () => {
    const {salaryRangesList} = props
    return salaryRangesList.map(salary => {
      const {changeSalary} = props
      const onClickSalaryItem = () => changeSalary(salary.salaryRangeId)

      return (
        <div className="">
          <li className="rating-item" key={salary.salaryRangeId}>
            <input
              type="checkbox"
              key="label"
              value="1"
              onChange={onClickSalaryItem}
              name="checked"
            />
            <span className="and-up">{salary.label}</span>
          </li>
        </div>
      )
    })
  }

  const renderSalaryRangeFilter = () => (
    <div>
      <h1 className="category-heading">Salary Range</h1>
      <ul className="ratings-list">{renderSalaryRangeList()}</ul>
    </div>
  )

  const renderEmploymentList = () => {
    const {employmentTypesList} = props
    return employmentTypesList.map(employment => {
      const {changeEmployment} = props
      const onClickEmploymentType = () =>
        changeEmployment(employment.employmentTypeId)

      return (
        <>
          <div>
            <li className="category-item" key={employment.employmentTypeId}>
              <input
                type="checkbox"
                value="1"
                key="label"
                onChange={onClickEmploymentType}
                name="checked"
              />
              <span className="category-name">{employment.label}</span>
            </li>
          </div>
        </>
      )
    })
  }

  const renderEmploymentTypesList = () => (
    <>
      <h1 className="category-heading">Type of Employment</h1>
      <ul className="categories-list">{renderEmploymentList()}</ul>
    </>
  )

  return (
    <div className="filters-group-container">
      {/* {renderSearchInput()} */}
      {renderEmploymentTypesList()}
      <hr className="hr-line" />
      {renderSalaryRangeFilter()}
      List
    </div>
  )
}

export default FilterGroup
