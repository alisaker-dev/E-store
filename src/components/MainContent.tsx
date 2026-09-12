import { useEffect, useState } from "react";
import { useFilter } from "../contexts/FilterContext";
import axios from "axios";
import type { Product } from "../types/Product";
import { FaFilterCircleDollar } from "react-icons/fa6";
import Pagination from "./Pagination";
import { useCart } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";

const MainContent = () => {
  const { searchQuery, selectedCategory, minPrice, maxPrice, keyword } =
    useFilter();
  const [products, setProducts] = useState<Product[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const [iserror, setIsError] = useState(false);
  const { addToCart } = useCart();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let url = `https://dummyjson.com/products?limit=0`;
        if (keyword) {
          url = `https://dummyjson.com/products/search?q=${keyword}`;
        }
        const res = await axios.get(url);
        const data: Product[] = res.data.products;
        setProducts(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setIsError(true);
        console.error("error fetching products", error);
      }
    };
    fetchProducts();
  }, [currentPage, keyword]);
  const getFilteredProducts = () => {
    let filteredProducts = products;
    if (selectedCategory) {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === selectedCategory,
      );
    }
    if (minPrice !== undefined) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price >= minPrice,
      );
    }
    if (maxPrice !== undefined) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price <= maxPrice,
      );
    }
    if (searchQuery) {
      filteredProducts = filteredProducts.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }
    switch (filter) {
      case "expensive":
        filteredProducts = filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case "cheap":
        filteredProducts = filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case "popular":
        filteredProducts = filteredProducts.sort((a, b) => b.rating - a.rating);
        break;
    }
    return filteredProducts;
  };
  const filteredProducts = getFilteredProducts();
  // pagination:
  const itemsPerPage = 10;
  const totalItems = filteredProducts.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );
  return (
    <>
      <main className="min-w-0 p-4 sm:p-6">
        <div className="relative my-5">
          <button
            className="rounded-full border border-slate-300 bg-white/80 px-4 py-2 flex items-center hover:border-teal-600 hover:bg-teal-50"
            onClick={() => setDropdownOpen((prev) => !prev)}
          >
            <FaFilterCircleDollar className="mr-1" />
            {filter === "all"
              ? "Filter"
              : filter.charAt(0).toLowerCase() + filter.slice(1)}
          </button>
          {dropdownOpen && (
            <div className="filter-menu absolute mt-2 w-full rounded border sm:w-40">
              <button
                onClick={() => setFilter("cheap")}
                className="block w-full px-4 py-2 text-left hover:bg-teal-50"
              >
                Cheap
              </button>
              <button
                onClick={() => setFilter("expensive")}
                className="block w-full px-4 py-2 text-left hover:bg-teal-50"
              >
                Expensive
              </button>
              <button
                onClick={() => setFilter("popular")}
                className="block w-full px-4 py-2 text-left hover:bg-teal-50"
              >
                Popular
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 gap-4 min-[420px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {iserror ? (
            <div className="text-red-400">No Internet Connection!</div>
          ) : loading ? (
            <div>Loading...</div>
          ) : (
            currentItems.map((product, key) => (
              <div
                key={key}
                className="surface-card flex min-w-0 flex-col rounded border p-3"
              >
                <img
                  src={`${URL.parse(product.images[0])}`}
                  alt=""
                  className="aspect-square w-full object-contain"
                />
                <hr />
                <h3 className="overflow-clip">{product.title}</h3>
                <span>${product.price}</span>
                <div className="mt-3 flex flex-col gap-2">
                  <button
                    onClick={() => addToCart(product)}
                    className="secondary-action rounded border px-3 py-2 text-sm"
                  >
                    Add to cart
                  </button>
                  <button
                    onClick={() => {
                      addToCart(product);
                      navigate("/checkout");
                    }}
                    className="primary-action rounded px-3 py-2 text-sm text-white"
                  >
                    Buy now
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      </main>
    </>
  );
};

export default MainContent;
