import { createContext, useContext, useReducer } from 'react'

export const ComplaintsContext = createContext()

export const complaintsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_WORKOUTS':
      return { 
        complaints: action.payload 
      }
    case 'CREATE_WORKOUT':
      return { 
        complaints: [action.payload, ...state.workouts] 
      }
    default:
      return state
  }
}

export const ComplaintsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(complaintsReducer, { 
    complaints: null
  })
  
  return (
    <ComplaintsContext.Provider value={{ ...state, dispatch }}>
      { children }
    </ComplaintsContext.Provider>
  )
}


export const useComplaintsContext = () => {
  const context = useContext(ComplaintsContext)

  if(!context) {
    throw Error('useComplaintsContext must be used inside an ComplaintsContextProvider')
  }

  return context
}