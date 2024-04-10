import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import loader from '../assets/tenor.gif'

const Categorylist = () => {
    const [category, setCategory] = useState([])
    const [isLoading, setLoading] = useState(false)
    const [hasError, setError] = useState(false)
    const [errMsg, setErrMsg] = useState("")

    const navigator = useNavigate();

    useEffect(() => {
        getData();
    }, [])

    // get data
    const getData = () => {
        setLoading(true)
        axios.get('http://localhost:3000/category')
            .then(res => {
                setLoading(false)
                console.log(res.data)
                setCategory(res.data.category)
            })
            .catch(error => {
                console.log(error.message.message)
                setLoading(false)
                setError(true)
                setErrMsg(error.message)
            })
    }

    // delete request 
    function deleteHandler(id,imageLink) {
        if(window.confirm("are you sure ?"))
        {
            axios.delete("http://localhost:3000/category/?id=" + id + "&" + "imageUrl=" + imageLink )
            .then(res => {
                console.log(res.data);
                getData();
            })
            .catch(error => {
                console.log(error.message)
            })
        }
    }

    // detail handler
    const viewHandler = (id)=>{
        navigator('/detail/'+id)
    }

    // edit handler
    const editHandler = (id)=>{
        navigator('/edit/'+id);
    }


    return (
        <div>
            <h1>Category List</h1>
            {isLoading && <div>
                <img alt="loading" style={{ width: '150px' }} src={loader} />
            </div>}

            {!isLoading && !hasError && <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Image</th>
                    </tr>
                </thead>
                <tbody>
                    {category?.map(data => <Category key={data._id} detail={data} deleteReq={deleteHandler} moreDetail = {viewHandler} editDetail = {editHandler} />)}
                </tbody>
            </table>}

            {hasError && <div>
                <p>error : {errMsg}</p>
            </div>}
        </div>
    )
}


const Category = (props) => {
    return (
        <tr>
            <td>{props.detail.name}</td>
            <td><img alt="image" style={{ width: '100px' }} src={props.detail.photo} /></td>
            <td><button onClick={() => { props.moreDetail(props.detail._id) }}>Detail</button></td>
            <td><button onClick={() => { props.editDetail(props.detail._id) }}>Edit</button></td>
            <td><button onClick={() => { props.deleteReq(props.detail._id,props.detail.photo) }}>Delete</button></td>
            
        </tr>
    )
}



export default Categorylist
