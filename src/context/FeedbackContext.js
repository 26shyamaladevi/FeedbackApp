import {v4 as uuidv4} from 'uuid'
import {createContext, useState,useEffect} from 'react'

const FeedbackContext = createContext()

export const FeedbackProvider = ({children}) => {
    const [isLoading, setIsLoading]= useState(true);
    const [feedback, setFeedback]= useState([])
     const[feedbackEdit, setFeedbackEit] = useState({
        item:{},
        edit: false,
     })

     useEffect(()=> {
        fetchFeedback()
     },[])

     //Fetch Feedback from Backend
     const fetchFeedback = async() => {
        const response = await fetch(`http://localhost:5000/feedback?_sort=id&_order=desc`)
        const data = await response.json()
        setFeedback(data)
        setIsLoading(false)
     }

     //Add Feedback
     const addFeedback = (newFeedback)=>{
        newFeedback.id = uuidv4();
        console.log(newFeedback)
        setFeedback([newFeedback,...feedback])
    }

    //editFeedback
    const editFeedback= (item)=>{
        setFeedbackEit({
            item,
            edit: true
        })

    }

    //updateFeedback
    const updateFeedback = (id, updtItem)=>{
        
        setFeedback(
            feedback.map((item)=>
            (item.id === id ? {...item, ...updtItem}: item)

        ))

    }

    //Delete Feedback
    const deleteFeedback = (id)=> {
        if(window.confirm('Are you sure you want to delete?'))
        {
            setFeedback(feedback.filter((item)=> item.id !== id))
        }
        
    }

    return <FeedbackContext.Provider value={{
        feedback: feedback,
        deleteFeedback,
        addFeedback,
        editFeedback,
        feedbackEdit,//value of the editfeedback state
        updateFeedback,
        isLoading

    }}>
        {children}
    </FeedbackContext.Provider>
}

export default FeedbackContext