import React, { useContext, useEffect, useState } from "react";
import { productContext } from "../Utils/Context";
import { nanoid } from "nanoid";
import { useNavigate, useParams } from "react-router-dom";

const Edit = () => {
  const [products, setproducts] = useContext(productContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setproduct] = useState({
    title:"",
    image:"",
    description:"",
    price:"",
    category:""
  });
  const changeHandeler =(e)=>{
    // console.log(e.target.name ,e.target.value);
    
    setproduct({...product ,[e.target.name]:e.target.value})
  }
  

  useEffect(() => {
    setproduct(products.filter((p) => p.id == id)[0]);
  }, [id]);

  // console.log(product);
  


  const productHandeler = (e) => {
    e.preventDefault();
    if (
      product.title.trim().length < 5 ||
      product.image.trim().length < 5 ||
      product.description.trim().length < 5 ||
      product.price.trim().length < 1 ||
      product.category.trim().length < 5
    ) {
      alert("Each and every input must have atleast 4 character");
      return;
    }
    console.log(product);
    const pi =products.findIndex(p=>p.id == id);
    console.log(products,pi);
    const copyData =[...products];
    copyData[pi]={...products[pi],...product}
    
    
    setproducts(copyData);
    localStorage.setItem("products",JSON.stringify(copyData))
    navigate(-1);

    
  };
  return (
    <form
      onSubmit={productHandeler}
      className="p-[5%] flex flex-col items-center w-screen h-screen"
    >
      <h1 className="mb-5 w-1/2 text-3xl">Edit Product</h1>

      <input
        type="url"
        name="image"
        onChange={changeHandeler}
        value={product &&  product.image}
        placeholder="image link"
        className="mb-3  w-1/2 text-1xl bg-zinc-200 p-2 rounded"
      />
      <input
        type="text"
        name="title"
        onChange={changeHandeler}
        value={product && product.title}
        placeholder="title"
        className="mb-3  w-1/2 text-1xl bg-zinc-200 p-2 rounded"
      />

      <div className="w-1/2 flex justify-between">
        <input
          type="text"
          name="category"
          onChange={changeHandeler}
          value={product && product.category}
          placeholder="Category"
          className="mb-3  w-[45%] text-1xl bg-zinc-200 p-2 rounded"
        />

        <input
          type="text"
          name="price"
        onChange={changeHandeler}
          value={product && product.price}
          placeholder="price"
          className="mb-3  w-[48%] text-1xl bg-zinc-200 p-2 rounded"
        />
      </div>
      <textarea
        rows="10"
        name="description"
        onChange={changeHandeler}
        value={product && product.description}
        placeholder="Description"
        className="mb-3  w-1/2  text-1xl bg-zinc-200 p-2 rounded"
      />
      <div className="w-1/2">
        <button className="py-2 px-5 border rounded border-blue-300 text-blue-300 ">
          Edit Product
        </button>
      </div>
    </form>
  );
};

export default Edit;
