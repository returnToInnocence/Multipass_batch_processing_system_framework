import React from 'react';

import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import context from '../store/context';
import MainPage from './mainPage';
import InputApp from '../input/InputApp';
import { useState } from 'react';

const App = () => {
  // console.log(123);
  const [JCB, setJCB] = useState(
    [
    {
      'name': '1作业 1',
      'arrivialTime': '10:00',
      'serviceTime': 25,
      'memory': 15,
      'tapeDriver': 2
  },
  {
      'name': '1作业 2',
      'arrivialTime': '10:20',
      'serviceTime': 30,
      'memory': 60,
      'tapeDriver': 1
  },
  {
      'name': '1作业 3',
      'arrivialTime': '10:30',
      'serviceTime': 10,
      'memory': 50,
      'tapeDriver': 3
  }
  
  ]
  );

  return (
    <div>
      <div className="container ui inputApp">
        <BrowserRouter>
          <Link to="/inputApp"
          className='ui primary huge fluid button'
          style={{ textDecoration:'none'}}
          >跳到输入页面</Link>
          <div className='PositionBlock2'></div>
          <Link to="/mainPage"
          className='ui primary huge fluid button'
          style={{ textDecoration:'none'}}
          >跳到主页面</Link>
          <context.Provider value={{
              JCB,
              setJCB
          }}>
            <Routes>
              <Route path="/inputApp" element={<InputApp/>}></Route>
              <Route path="/mainPage" element={<MainPage/>}></Route>
            </Routes>
          </context.Provider>
          
        </BrowserRouter>
      </div>
    </div>
  );
};

export default App;
