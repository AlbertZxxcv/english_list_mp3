import React from 'react';
import InputForm from './component/InputForm';
import './App.css';


const App = () => {
  
  return (
    <div className='body'>
      <div className='header'>
        Convert English Word List to MP3
      </div>
      <div className='middle'>
        <div className='content'>
          <InputForm/>
        </div>
        <div className='sider'>
          sdadasd
        </div>
      </div>
      <div className='footer'>
        <div>
          copyright Albert Tang
        </div>
        <div className='footer-content'>
          WeChat: AlbertTang18
        </div>
      </div>
    </div>
  );
};

export default App;