import ProductCard from "../../../ProductCard";
import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, SlidersHorizontal } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchFlowers } from "../../../../hooks/LikeFn";
import { MainMappingLoading } from "../../../Loading";

export default function ({ currentPage, setCurrentPage }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sort, setSortOrder] = useState(searchParams.get("sort") || "default-sorting");
  const [selectedFilter, setSelectedFilter] = useState(searchParams.get("type") || "all-plants");
  const topRef = useRef(null);
  const onePage = 9;
  const category = searchParams.get("category") || "house-plants";
  const min = searchParams.get("range_min") || 0;
  const max = searchParams.get("range_max") || 1000;

  useEffect(() => {
    setSearchParams({ category, sort, type: selectedFilter, range_min: min, range_max: max });
  }, [category, sort, selectedFilter, min, max]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    if (topRef.current) { topRef.current.scrollIntoView({ behavior: "smooth" }) }
  };

  const { data: products = { data: [] }, error, isLoading, isFetching } = useQuery({
    queryKey: ["flower", category, sort, selectedFilter, min, max],
    queryFn: () => fetchFlowers({ queryKey: ["flower", category, sort, selectedFilter, min, max] }),
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
  });

  const totalPages = Math.ceil(products?.data?.length / onePage);
  const paginatedProducts = products?.data?.slice((currentPage - 1) * onePage, currentPage * onePage);

  return (
    <div className="w-[76%] lg:pl-5 pt-0 max-lg:w-full">
      <div ref={topRef} className="flex justify-between items-center mb-10">
        <ul className="flex justify-start  items-center gap-5 font-semibold">
          {[{ label: "All Plants", value: "all-plants" }, { label: "New Arrivals", value: "new-arrivals" }, { label: "Sale", value: "sale" }].map(({ label, value }) => (
            <li key={value} className={`cursor-pointer border-b ${selectedFilter === value ? "text-[#46A358] border-b-[#46A358]" : "hover:text-[#46A358] border-b-transparent"} transition`} onClick={() => { setSelectedFilter(value); setSearchParams({ category, sort, type: value, range_min: min, range_max: max }); }}>
              {label}
            </li>
          ))}
        </ul>
        <div className="flex max-md:hidden justify-end gap-3 items-center font-semibold">
          <p>Sorting:
            <select name="sort" className="outline-none font-normal" id="sort" value={sort} onChange={(e) => {
              setSortOrder(e.target.value);
              setSearchParams({ category, sort: e.target.value, type: selectedFilter, range_min: min, range_max: max });
            }}>
              <option value="default-sorting">Default Sorting</option>
              <option value="the-cheapest">The Cheapest</option>
              <option value="most-expensive">Most Expensive</option>
            </select>
          </p>
        </div>
        <button className="md:hidden"><SlidersHorizontal /></button>
      </div>

      {isLoading || isFetching ? (
        <MainMappingLoading length={9} />) : paginatedProducts?.length > 0 ? (<>
          <div className="grid grid-cols-2 sm:grid-cols-3 justify-items-center gap-5">
            {paginatedProducts.map((product, index) => (
              <ProductCard key={index} data={product} />
            ))}
          </div>
          <div className="flex justify-center sm:justify-end items-center gap-2 mt-5">
            <button className="p-2 bg-gray-200 rounded disabled:opacity-40"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
            >
              <ChevronLeft />
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button key={i} onClick={() => handlePageChange(i + 1)}
                className={`px-4 py-2 rounded ${currentPage === i + 1 ? "bg-[#46A358] text-white" : "bg-gray-200"}`}>
                {i + 1}
              </button>
            ))}
            <button className="p-2 bg-gray-200 rounded disabled:opacity-50"
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
            >
              <ChevronRight />
            </button>
          </div>
        </>) : (<div className="text-3xl">No any Product </div>)}
    </div>
  );
}