import {v4 as uuidv4} from 'uuid'
import { useState } from "react"
import Header from "./components/Header" 
import FeedbackList from "./components/FeedbackList"
import FeedbackStats from "./components/FeedbackStats"
import FeedbackForm from "./components/FeedbackForm"
import FeedbackData from "./components/data/FeedbackData"



function App(){

    //FeedbcakData
    const [feedback, setFeedback]= useState(FeedbackData)

    //Delete Feedback
    const deleteFeedback = (id)=> {
        if(window.confirm('Are you sure you want to delete?'))
        {
            setFeedback(feedback.filter((item)=> item.id !== id))
        }
        
    }

    //Add Feedback
    const addFeedback = (newFeedback)=>{
        newFeedback.id = uuidv4();
        console.log(newFeedback)
        setFeedback([newFeedback,...feedback])
    }



    return (
        <>
            <Header/>
            <div className="container">
                <FeedbackForm handleAdd = {addFeedback}/>
                <FeedbackStats feedback={feedback}/>
                <FeedbackList feedback={feedback} handleDelete = {deleteFeedback}/>
            </div>
       </>
    )
}



export default App