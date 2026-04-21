import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { productContext } from "../Utils/Context";
import Loading from "./Loading";

const Details = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [products, setProducts] = useContext(productContext);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (!products) {
      return;
    }

    const selectedProduct = products.find((item) => item.id == id) || null;
    setProduct(selectedProduct);
  }, [id, products]);

  const deleteProduct = (productId) => {
    const updatedProducts = products.filter((item) => item.id !== productId);
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    navigate("/");
  };

  if (!products) {
    return <Loading />;
  }

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="surface-card w-full max-w-xl p-8 text-center">
          <h1 className="text-2xl font-semibold text-slate-100">Product not found</h1>
          <p className="mt-2 text-slate-400">
            The product you are looking for is unavailable or has been removed.
          </p>
          <Link to="/" className="btn-primary mt-6">
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4 md:p-8">
      <div className="surface-card w-full max-w-5xl p-5 md:p-8">
        <div className="grid gap-6 md:grid-cols-2 md:gap-8">
          <div className="rounded-2xl border border-slate-700/70 bg-[rgba(8,14,27,0.95)] p-4">
            <img
              className="h-[340px] w-full object-contain md:h-[420px]"
              src={product.image}
              alt={product.title}
            />
          </div>

          <div className="flex flex-col justify-between gap-6">
            <div>
              <h1 className="text-2xl font-bold leading-tight text-slate-100 md:text-3xl">
                {product.title}
              </h1>
              <p className="mt-2 text-sm uppercase tracking-[0.16em] text-slate-500">
                {product.category}
              </p>
              <p className="mt-4 text-2xl font-bold text-emerald-400">${product.price}</p>
              <p className="mt-5 text-sm leading-7 text-slate-300 md:text-base">
                {product.description}
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link to={`/edit/${product.id}`} className="btn-primary sm:min-w-[8.5rem]">
                Edit Product
              </Link>
              <button
                onClick={() => deleteProduct(product.id)}
                className="btn-danger sm:min-w-[8.5rem]"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
