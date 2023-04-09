
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
        const response = await fetch(`https://feedback-server-lemon.vercel.app/feedback?_sort=id&_order=desc`)
        const data = await response.json()
        setFeedback(data)
        setIsLoading(false)
     }

     //Add Feedback
     const addFeedback = async (newFeedback) => {
        const response = await fetch('https://feedback-server-lemon.vercel.app/feedback',{
            method: 'POST',
            headers:{
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(newFeedback)
        })
        const data = await response.json()
        
        await setFeedback([data,...feedback])
    }

    //editFeedback
    const editFeedback= (item)=>{
        setFeedbackEit({
            item,
            edit: true
        })

    }

    //updateFeedback
    const updateFeedback = async (id, updtItem)=>{
        const response =await fetch(`https://feedback-server-lemon.vercel.app/feedback/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updtItem)
        })
        const data = await response.json()
        
        setFeedback(
            feedback.map((item)=>
            (item.id === id ? {...item, ...data} : item)

            ))

    }

    //Delete Feedback
    const deleteFeedback = async (id) => {
        if(window.confirm('Are you sure you want to delete?'))
        {
            await fetch(`https://feedback-server-lemon.vercel.app/feedback/${id}`, {method: 'DELETE'})
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