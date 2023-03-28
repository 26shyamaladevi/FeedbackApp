import {v4 as uuidv4} from 'uuid'
import {createContext, useState} from 'react'

const FeedbackContext = createContext()

export const FeedbackProvider = ({children}) => {
    const [feedback, setFeedback]= useState([
        {
            id:1,
            text:'This is feedback item 1',
            rating:10
        },
        {
            id:2,
            text:'This is feedback item 2',
            rating:10
        },
        {
            id:3,
            text:'This is feedback item 3',
            rating:10
        },
        {
            id:4,
            text:'This is feedback item 4',
            rating:10
        }
    ])
     const[feedbackEdit, setFeedbackEit] = useState({
        item:{},
        edit: false,
     })

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

    }}>
        {children}
    </FeedbackContext.Provider>
}

export default FeedbackContext