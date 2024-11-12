
import React, { useContext, useEffect, useState } from "react";
import { Link,  useNavigate,  useParams } from "react-router-dom";
import { productContext } from "../Utils/Context";


const Details = () => {
  const navigate = useNavigate();

  const [products ,setproducts]=useContext(productContext);
  const [product,setproduct]=useState(null);
  const {id} =useParams();
  
   
   
   
    // const getsingleProduct = async ()=>{
    // try {
      // const {data} =await axios.get(`/products/${id}`)
      // setproduct(data);
      // console.log(data);
    // } catch (error) {
      // console.log(error);
    // }
  // } 
  useEffect(()=> {
    
    if(!product){
      setproduct(products.filter(p=> p.id  == id)[0]);
    }
    localStorage.setItem("products", JSON.stringify(products));
    // getsingleProduct();
  },[])
  
  const productDeleteHandeler =(id)=>{
  const FilterdProduct = products.filter(p => p.id !== id);
  setproducts(products);
  localStorage.setItem("products",JSON.stringify(FilterdProduct));
  navigate("/")

   }
  return (  product ?
    
  
    (<div className="w-[70%] h-full m-auto flex items-center gap-10  p-[10%]">
      <img
        className=" object-contain h-[80%] w-[40%]"
        src={ product.image}
        alt=""
      />
      <div className="content w-[50%]">
        <h1 className="text-4xl">
          {product.title}
        </h1>
        <h3 className="text-zinc-400 my-5">{ product.category}</h3>
        <h2 className="text-red-400 mb-3">${ product.price}</h2>
        <p className="mb-[5%]">
         {product.description}
        </p>
        <Link to={`/edit/${product.id}`} className="mr-5 py-2 px-5 border rounded border-blue-300 text-blue-300">Edit</Link>
        <button onClick={()=>productDeleteHandeler(product.id)} className="py-2 px-5 border rounded border-red-300 text-red-300">Delete</button>
      </div>
    </div>):<h1 className="5xl">Loading...</h1>
  );
};

export default Details;
