import React, {Fragment} from "react";
import './App.css';
import InputCmd from '../src/Components/InputCmd'
import ListCmd from "./Components/ListCmd";


function App(){
  return(
    <Fragment>
      <div className="container">
        <InputCmd/>
        <ListCmd/>
      </div>
    </Fragment>
  )
}

export default App;
