import React, { useContext, useState } from "react";
import { productContext } from "../Utils/Context";
import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Create = () => {
  const navigate= useNavigate()
  const [ products, setproducts ]= useContext(productContext);
  const [title, settitle] = useState("");
  const [image, setimage] = useState("");
  const [description, setdescription] = useState("");
  const [price, setprice] = useState("");
  const [category, setcategory] = useState("");

  const productHandeler = (e) => {
    e.preventDefault();
    if (title.trim().length <5 || image.trim().length<5||description.trim().length <5 || price.trim().length<1|| category.trim().length <5){
        alert("Each and every input must have atleast 4 character")
        return;
    }
    const product = {id:nanoid(), title, image, description, price, category, };
    setproducts([...products, product]);
    localStorage.setItem("products",JSON.stringify([...products,product]));
    toast.success("Product added sucessfully")
    navigate("/");


  };

  return (
    <form
      onSubmit={productHandeler}
      className="p-[5%] flex flex-col items-center w-screen h-screen"
    >
      <h1 className="mb-5 w-1/2 text-3xl">Add New Products</h1>

      <input
        type="url"
        onChange={(e) => {
          setimage(e.target.value);
        }}
        value={image}
        placeholder="image link"
        className="mb-3  w-1/2 text-1xl bg-zinc-200 p-2 rounded"
      />
      <input
        type="text"
        onChange={(e) => {
          settitle(e.target.value);
        }}
        value={title}
        placeholder="title"
        className="mb-3  w-1/2 text-1xl bg-zinc-200 p-2 rounded"
      />

      <div className="w-1/2 flex justify-between">
        <input
          type="text"
          onChange={(e) => {
            setcategory(e.target.value);
          }}
          value={category}
          placeholder="Category"
          className="mb-3  w-[45%] text-1xl bg-zinc-200 p-2 rounded"
        />

        <input
          type="text"
          onChange={(e) => {
            setprice(e.target.value);
          }}
          value={price}
          placeholder="price"
          className="mb-3  w-[48%] text-1xl bg-zinc-200 p-2 rounded"
        />
      </div>
      <textarea
        rows="10"
        onChange={(e) => {
          setdescription(e.target.value);
        }}
        value={description}
        placeholder="Description"
        className="mb-3  w-1/2  text-1xl bg-zinc-200 p-2 rounded"
      />
      <div className="w-1/2">
        <button className="py-2 px-5 border rounded border-blue-300 text-blue-300 ">
          Add New Product
        </button>
      </div>
    </form>
  );
};

export default Create;
