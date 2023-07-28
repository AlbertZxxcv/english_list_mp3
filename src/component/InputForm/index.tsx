import React, { useState } from 'react';
import { Input, Button } from 'antd';
import './index.css'
import { PlusOutlined } from '@ant-design/icons';
// import axios from 'axios';
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

    const url = "https://3.23.99.16:8000/getAudio/";
    // const url = "/getAudio/";
    const data = inputs;

    // console.log(data);
    fetch(url, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Origin': 'https://main.d1dvn78d7wazol.amplifyapp.com'
      },
      body: JSON.stringify(data)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.blob(); // 返回一个Promise，将响应数据解析为Blob对象
      })
      .then(blobData => {
        // 从Blob对象创建URL
        const audioUrl = URL.createObjectURL(blobData);

        // 创建一个隐藏的链接，用于下载音频文件
        const downloadLink = document.createElement('a');
        downloadLink.href = audioUrl;
        downloadLink.download = 'audio.mp3'; // 设置下载文件的名称
        document.body.appendChild(downloadLink);
        downloadLink.click(); // 触发下载
        document.body.removeChild(downloadLink); // 移除隐藏的链接

        // 释放URL对象
        URL.revokeObjectURL(audioUrl);
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
