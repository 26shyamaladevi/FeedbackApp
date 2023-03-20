
import PropTypes from 'prop-types'


function FeedbackStats({feedback}) {

   
//Calculate Avg Rating
 let avg = feedback.reduce((acc, Curr)=>{
    return acc + Curr.rating

 }, 0)

 avg=(avg/feedback.length).toFixed(1).replace(/[.,]0$/,'')

 


  return <div className='feedback-stats'>
    <h4>{feedback.length} Reviews</h4>
    <h4>Average Rating: {isNaN(avg)? 0: avg}</h4>
  
  </div>
  
}

FeedbackStats.propTypes = {
    feedback: PropTypes.array.isRequired
}

export default FeedbackStats