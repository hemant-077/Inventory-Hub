import React, { useContext, useEffect, useState } from 'react'
import Nav from './Nav'
import { Link, useLocation } from 'react-router-dom'
import { productContext } from '../Utils/Context'
import Loading from './Loading'
import axios from '../Utils/axios'

const Home = () => {
  const [products] =useContext(productContext);
  const {search} =useLocation();
  const category = decodeURIComponent(search.split('=')[1]); 


  const [filterdProducts, setfilterdProducts] = useState(null);
 const getproductcategory =async ()=>{
  try {
    const {data} =await axios.get(`products/category/${category}`);
    setfilterdProducts(data);
    
  } catch (error) {
    console.log(error);
    
  }
 }
 useEffect(()=>{
  // console.log(category)
  if(!filterdProducts || category == 'undefined') setfilterdProducts(products);
  if(category!="undefined") {
    // getproductcategory()
    setfilterdProducts(products.filter(p =>p.category == category))
  };
 },[category,products])

 
  return (products?( 

    <>
    <Nav/>
      <div className=" w-[85%] p-10 pt-[5%] flex flex-wrap oveflow-x-hidden overflow-y-auto">
      {filterdProducts && filterdProducts.map((p,i)=>(
        <Link key={p.id} to={`/details/${p.id}`} className="mr-5 mb-5 p-5 border flex flex-col justify-center items-center shadow h-[30vh] w-[18%]">
        <div
          className=" hover:scale-110  w-full h-[80%] mb-5  bg-center  bg-contain bg-no-repeat"
          style={{
            backgroundImage:
              `url(${p.image})`,
          }}
        ></div>
        <h1 className="hover:text-blue-200">{p.title}</h1>
      </Link>
      ))}

        
        
        
      </div>
    </>):<Loading/>
  )
}

export default Home
