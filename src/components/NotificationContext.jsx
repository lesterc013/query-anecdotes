/**
 * Create the NotificationContext object which needs to be imported by Child Components who want to useContext with it
 * Construct the Provider Component so we can pass in the return values of useReducer
 */

import { createContext, useReducer } from 'react'
import notificationReducer from '../notificationReducer'

const NotificationContext = createContext()

// Component to wrap App in
export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    null
  )

  // Wrap App.jsx with this; Every child of App will be able to use the context
  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext
