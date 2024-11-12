import React, { useContext } from 'react'
import { productContext } from '../Utils/Context';
import { Link } from 'react-router-dom';

const Nav = () => {
  const [product] =useContext(productContext);
  let distinct_category = product && product.reduce((acc,curr)=>[...acc,curr.category],[]);
  distinct_category =[...new Set(distinct_category)]
  // console.log(distinct_category);
 const color =()=>{
  return `rgba(${(Math.random()*255).toFixed()},${(Math.random()*255).toFixed()},${(Math.random()*255).toFixed()},0.4)`;
 }
  return (
    <nav className="w-[15%] h-full bg-zinc-100 flex flex-col items-center pt-5">
    <a
      className="py-2 px-5 border rounded border-blue-300 text-blue-300 "
      href="/create"
    >
      Add New Product
    </a>
    <hr className="my-3 w-[80%]" />
    <h1 className="text-2xl mb-3 w-[80%]">Catogory Filter</h1>

    <div className=" w-[80%]">
      {distinct_category.map((c,i)=>(
        <Link key={i} to={`/?category=${c}`} className="flex  items-center  mb-3">
        <span style={{backgroundColor:color()}} className="mr-2 rounded-full w-[15px] h-[15px]  "></span>
        {c}
    
      </Link>

      ))}
      
    </div>
  </nav>
  )
}

export default Nav
