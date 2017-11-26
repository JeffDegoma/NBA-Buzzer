import React from 'react'
import { CSSTransitionGroup } from 'react-transition-group' // ES6




const Fader = ({ children }) => (
  <CSSTransitionGroup
    transitionName='example'
    transitionEnterTimeout={2000}
    transitionLeaveTimeout={200}
    >
    { children }
  </CSSTransitionGroup>
)

export default Fader;