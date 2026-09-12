import axios from "axios";
import { useEffect, useState, type ChangeEvent } from "react";
import { useFilter } from "../contexts/FilterContext";
import type { Product } from "../types/Product";
import { Show, SignInButton, UserButton } from "@clerk/react";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";

const Sidebar = () => {
  const {
    searchQuery,
    setSearchQuery,
    setSelectedCategory,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    keyword,
    setKeyword,
  } = useFilter();
  const [categories, setCategories] = useState<string[]>([]);
  const [keywords] = useState<string[]>([
    "apple",
    "watch",
    "fashion",
    "trend",
    "shoes",
    "shirt",
  ]);
  const { itemCount } = useCart();
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("https://dummyjson.com/products?limit=0");
        const data: Product[] = res.data.products;
        const uniqueCategories: string[] = Array.from(
          new Set(data.map((item: Product) => item.category)),
        );
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("error fetching products", error);
      }
    };
    fetchCategories();
  }, []);
  const handleMinAndMaxPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (e.target.name === "minPrice") {
      setMinPrice(value ? parseFloat(value) : undefined);
    } else if (e.target.name === "maxPrice") {
      setMaxPrice(value ? parseFloat(value) : undefined);
    }
  };
  const handleKeyword = (keyword: string) => {
    setKeyword(keyword);
  };
  const handleResetFilter = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setMinPrice(undefined);
    setMaxPrice(undefined);
    setKeyword("");
  };
  return (
    <aside className="w-full shrink-0 border-b border-gray-300 p-4 md:w-64 md:border-b-0 md:border-r md:p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        {/* logo */}
        <h1 className="my-2 w-fit rounded-full border-2 border-dashed border-amber-100 bg-blue-300 p-2 italic font-serif">
          E-Store
        </h1>
        <Show when="signed-out">
          <SignInButton mode="modal">
            <button className="rounded border border-blue-600 px-3 py-2 text-sm text-blue-600 hover:bg-blue-50">
              Sign in
            </button>
          </SignInButton>
        </Show>
        <Show when="signed-in">
          <UserButton />
        </Show>
      </div>
      <Link
        to="/cart"
        className="mb-5 block rounded border border-blue-600 px-3 py-2 text-center text-blue-600 hover:bg-blue-50"
      >
        Cart ({itemCount})
      </Link>
      {/* search products */}
      <div className="flex flex-col gap-1">
        <input
          type="text"
          className="border rounded px-2 sm:mb-0"
          placeholder="search product"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="mb-5 flex gap-3">
          <input
            type="number"
            className="border rounded px-5 w-full"
            placeholder="Min"
            name="minPrice"
            value={minPrice ?? ""}
            onChange={handleMinAndMaxPriceChange}
          />
          <input
            type="number"
            className="border rounded px-5 w-full"
            placeholder="Max"
            name="maxPrice"
            value={maxPrice ?? ""}
            onChange={handleMinAndMaxPriceChange}
          />
        </div>
      </div>
      {/* categories */}
      <h2 className="mb-2">Categories:</h2>
      <div className="flex h-fit flex-col flex-nowrap">
        <select
          name="categories"
          defaultValue=""
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="" disabled>
            Select Category
          </option>
          {categories.map((category, key) => (
            <option key={key} value={`${category}`} className="w-5">
              {category.toUpperCase()}
            </option>
          ))}
        </select>
      </div>
      {/* keywords */}
      <h2 className="my-2">Keywords:</h2>
      <div className="flex flex-wrap mt-3">
        {keywords.map((item, index) => (
          <button
            key={index}
            onClick={() => handleKeyword(item)}
            className={`ml-2 mb-3 p-2 text-left border rounded hover:bg-gray-200 ${keyword === item && "bg-gray-300"}`}
          >
            {item.toUpperCase()}
          </button>
        ))}
      </div>
      {/* reset filters */}
      <button
        onClick={handleResetFilter}
        className="w-full mb-16 mt-3 p-3 border-none rounded-xl text-white bg-black hover:bg-gray-800 cursor-pointer"
      >
        Reset Filters
      </button>
    </aside>
  );
};
export default Sidebar;
