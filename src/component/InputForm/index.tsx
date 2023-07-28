import React, { useState } from 'react';
import { Input, Button } from 'antd';
import './index.css'
import { PlusOutlined } from '@ant-design/icons';
import axios from 'axios';
// import fs from 'fs';

const InputForm = () => {
  const [inputs, setInputs] = useState<string[]>([]);
  const [newInput, setNewInput] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewInput(event.target.value);
  };

  const handleAddInput = () => {
    if (newInput.trim() !== '') {
      if (inputs.length < 50) {
        setInputs([...inputs, newInput]);
        setNewInput('');
      } else {
        alert('Can\'t exceed 50 words');
      }

    }
  };

  const handleEnterInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) {
      if (newInput.trim() !== '') {
        if (inputs.length < 50) {
          setInputs([...inputs, newInput]);
          setNewInput('');
        } else {
          alert('Can\'t exceed 50 words');
        }
      }
    }
  };

  const handleSubmit = () => {

    const url = "http://3.23.99.16:8000/getAudio/";
    const data = inputs;
    
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('请求失败。');
        }
      })
      .then(result => {
        // 处理响应数据
        console.log('响应数据：', result);
      })
      .catch(error => {
        console.error('请求错误：', error);
      });
  };

  return (
    <div className='input-form-body'>
      <div className='input-area'>
        <Input
          type="text"
          value={newInput}
          onChange={handleInputChange}
          placeholder="Enter Word"
          className='input-field'
          onKeyUp={(e) => handleEnterInput(e)}
        />
        <Button type="primary" className='input-button'
          shape="circle" icon={<PlusOutlined />} onClick={handleAddInput} disabled={!newInput.trim()} />
      </div>

      <div className='record-area'>
        <div className='records'>
          {inputs.map((text, index) => (
            <Input key={index} type="text" value={text} readOnly className='record' />
          ))}
        </div>
      </div>

      <div className='submit-area'>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleSubmit} disabled={inputs.length === 0} className='submit-button'>
          Get Radio
        </Button>
      </div>
    </div>
  );
};

export default InputForm;
