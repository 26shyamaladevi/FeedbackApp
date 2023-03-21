import {v4 as uuidv4} from 'uuid'
import {BrowserRouter as Router, Route,Routes} from 'react-router-dom'
import { useState } from "react"
import Header from "./components/Header" 
import FeedbackList from "./components/FeedbackList"
import FeedbackStats from "./components/FeedbackStats"
import FeedbackForm from "./components/FeedbackForm"
import FeedbackData from "./components/data/FeedbackData"
import AboutIcon from './components/AboutIcon'
import AboutPage from './pages/AboutPage'



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
        <Router>
              
           
                <Header/>
            
               
                <div className="container">
            
                <Routes>   
                 <Route exact path ='/' element={<><FeedbackForm handleAdd = {addFeedback}/> 
    <FeedbackStats feedback={feedback}/>
    <FeedbackList feedback={feedback} handleDelete = {deleteFeedback}/>
</>}   />


 
 
                    
                <Route path='/about' element={<AboutPage/>} />
                     
                </Routes>  
                    
                <AboutIcon/>
                </div>
            
                  
       </Router>
       
    )
}



export default App