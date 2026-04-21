import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { nanoid } from "nanoid";
import { productContext } from "../Utils/Context";
import Loading from "./Loading";

const hasMinLength = (value, minLength) => String(value).trim().length >= minLength;

const Create = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useContext(productContext);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

  const addProduct = (event) => {
    event.preventDefault();

    if (
      !hasMinLength(title, 5) ||
      !hasMinLength(image, 5) ||
      !hasMinLength(description, 5) ||
      !hasMinLength(price, 1) ||
      !hasMinLength(category, 5)
    ) {
      toast.error("Please fill all fields correctly before submitting.");
      return;
    }

    const newProduct = {
      id: nanoid(),
      title,
      image,
      description,
      price,
      category,
    };

    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    toast.success("Product added successfully");
    navigate("/");
  };

  if (!products) {
    return <Loading />;
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-6 md:p-8">
      <form onSubmit={addProduct} className="surface-card w-full max-w-3xl p-6 md:p-8">
        <h1 className="section-title text-center">Add New Product</h1>
        <p className="section-copy text-center">
          Create a product entry with complete pricing and category details.
        </p>

        <div className="mt-8 space-y-4">
          <div>
            <label htmlFor="create-image" className="input-label">
              Product Image URL
            </label>
            <input
              id="create-image"
              type="url"
              value={image}
              onChange={(event) => setImage(event.target.value)}
              placeholder="https://example.com/image.jpg"
              className="field-input"
            />
          </div>

          <div>
            <label htmlFor="create-title" className="input-label">
              Product Title
            </label>
            <input
              id="create-title"
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Premium Wireless Headphones"
              className="field-input"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="create-category" className="input-label">
                Category
              </label>
              <input
                id="create-category"
                type="text"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                placeholder="electronics"
                className="field-input"
              />
            </div>

            <div>
              <label htmlFor="create-price" className="input-label">
                Price
              </label>
              <input
                id="create-price"
                type="number"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
                placeholder="299"
                className="field-input"
              />
            </div>
          </div>

          <div>
            <label htmlFor="create-description" className="input-label">
              Description
            </label>
            <textarea
              id="create-description"
              rows="7"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Write a concise, value-driven product description."
              className="field-input resize-none"
            ></textarea>
          </div>
        </div>

        <div className="mt-7 text-center">
          <button className="btn-primary min-w-48" type="submit">
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default Create;
