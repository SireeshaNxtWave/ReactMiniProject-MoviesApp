import './index.css'

const FailureView = props => {
  const {onRetry} = props

  const onClickRetry = () => onRetry()

  return (
    <div className="failure-view-container">
      <img
        alt="failure view"
        className="failure-img"
        src="https://res.cloudinary.com/dbs4ptlww/image/upload/v1673884538/alert-triangle_qsxb3z.png"
      />
      <p className="description">Something went wrong. Please try again</p>
      <button type="button" className="retry-btn" onClick={onClickRetry}>
        Try Again
      </button>
    </div>
  )
}
export default FailureView
