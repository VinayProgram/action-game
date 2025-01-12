import React from 'react'
import Editor from './editor/editor'
import VideoCameraComponent from './tensorModels/videoCamera'
import HandTrack from './tensorModels/gesture-componets'

const App = () => {
  return (
    <div>
      <Editor/>
      <HandTrack/>
    </div>
  )
}

export default App