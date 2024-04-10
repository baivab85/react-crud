import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import loader from '../assets/tenor.gif';

const Detail = () => {
    const params = useParams();
    const [data, setData] = useState();
    const [isLoading, setLoading] = useState(false);
    const [error,setError] = useState('');

    useEffect(() => {
        setLoading(true);
        axios.get('http://localhost:3000/category/' + params.id)
            .then(res => {
                setLoading(false);
                console.log(res.data.category);
                setData(res.data.category);
            })
            .catch(error => {
                console.log(error);
                setError(error.message)
                setLoading(false);
            })
    }, [])


    return (
        <>
            {isLoading && <div>
                <img alt="loading" style={{ width: '150px' }} src={loader} />
            </div>}

            {data && !isLoading && <div>
                <h1>{data.name}</h1>
                <img style={{ width: '200px' }} alt='product' src={data.photo} />
            </div>}
            {error && 
            <div>
                <p>error : {error}</p>
            </div>
            }
        </>
    )
}

export default Detail
