import React from 'react'
import { useEffect } from 'react';
import  axios  from 'axios';
import { useState } from 'react';

export default function FatchApi() {
    const [first, setfirst] = useState([])
    const fatchAxios=async() =>{
        const res= await axios.get('https:jsonplaceholder.typicode.com/posts')
    setfirst(res.data)
    }
    useEffect(() => {
        fatchAxios()
    }, [])
    
  return <>
  {first.map((item,idx)=> {return <h3 key={idx}>{item.title}</h3>})}
  
  </>
}
 