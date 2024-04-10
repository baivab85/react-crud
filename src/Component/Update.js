import axios from 'axios';
import React, { useState } from 'react';
import loader from '../assets/tenor.gif';
import {useNavigate, useParams } from 'react-router-dom';
import preview from '../assets/preview.webp';



const Update = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [category, setCategory] = useState("");
    const [hasError, setHasError] = useState(false);
    const [error, setError] = useState("");
    const [isloading, setLoading] = useState(false);
    const [imageUrl,setImageUrl] = useState(preview);

    let navigate = useNavigate();
    const params = useParams();
    console.log(params.id)



    // get data
    useState(()=>{
        setLoading(true);
        axios.get('http://localhost:3000/category/'+params.id).
        then(res=>{
            setLoading(false);
            console.log(res.data.category);
            setCategory(res.data.category.name);
            setImageUrl(res.data.category.photo);
        })
        .catch(err=>{
            setLoading(false);
            console.log(error.message)
        })
    },[])

    // file handler
    const fileHandler = (e)=>{
      setSelectedFile(e.target.files[0])
      console.log(e.target.files[0]);
      setImageUrl(URL.createObjectURL(e.target.files[0]));
    }

    // handle submit
    const handleSubmit = (event) => {
      event.preventDefault();
      setLoading(true);
  
      const formData = new FormData();
      formData.append('photo', selectedFile);
      formData.append('name', category);
  
      axios.put("http://localhost:3000/category/"+params.id, formData)
        .then(res => {
          console.log(res.data);
          setLoading(false);
          navigate("/category-list");
        })
        .catch((error) => {
          console.log(error.message);
          setLoading(false);
          setHasError(true);
          setError(error.message);
        })
  
    }


    return (
      <>
        {isloading &&
          <div>
            <img alt="loading" style={{ width: '150px' }} src={loader} />
          </div>
        }
        {!isloading && <div>
          <h1>add new category</h1>
          <form onSubmit={handleSubmit}>
            <input value={category} type="text" onChange={(e) => setCategory(e.target.value)} />
            <input type="file" onChange={(e) => { fileHandler(e) }} />
            <button type="submit">update category</button>
          </form>
          <br/>
          <img style={{width:'100px'}} src={imageUrl} />
        </div>}

  
        {hasError && <div>
          <p>error : {error}</p>
        </div>}
      </>
    )
}

export default Update
