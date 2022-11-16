import { useState } from 'react'
import axios from 'axios';

import './App.css'

function App() {
  const [file,setFile] = useState()

  const handleChange = e => {
    console.log(e.target.files);
    setFile(e.target.files[0]);
  }

  const handleUpload = (event) => {
    event.preventDefault();
    const url = "http://localhost:3002/mint";
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", file.name);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    console.log(formData)
    axios.post(url, formData).then((response) => {
      console.log(response.data);
    });
  }
  return (
    <div className="App">
      <form onSubmit={handleUpload} enctype="multipart/form-data" p>
        <input type="file" name="document" onChange={handleChange} />
        <button onClick={handleUpload}>Upload</button>
      </form>
    </div>
  );
}

export default App
