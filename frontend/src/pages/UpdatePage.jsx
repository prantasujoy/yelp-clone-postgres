import { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiService from "../Services/apiservice";
import { useQuery } from "@tanstack/react-query";

import { RestaurantContext } from "../Contexts/RestaurantContexts";

const UpdatePage = () => {
  const navigate = useNavigate();
  const { updateRestaurant } = useContext(RestaurantContext);
  const { id } = useParams();

  const [name, setName] = useState();
  const [location, setLocation] = useState();
  const [priceRange, setPriceRange] = useState();

  const { isPending, error } = useQuery({
    queryKey: ["restaurantData"],
    queryFn: async () => {
      const response = await apiService.get(`/restaurants/${id}`);
      const [{ name, location, price_range }] = response.data.data.restaurants;

      setName(name);
      setLocation(location);
      setPriceRange(price_range);
      return response.data.data.restaurants;
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiService.put(`/restaurants/${id}`, {
        name,
        location,
        price_range: priceRange,
      });

      const [new_restaurant] = response.data.data.restaurants;
      updateRestaurant(id, new_restaurant);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="h-50 p-5 flex justify-center items-center  bg-slate-800 min-w-full">
        <p className="text-3xl font-medium text-white">Update Page</p>
      </div>

      <div className="max-w-full  flex justify-center  py-5 my-10">
        <form onSubmit={handleSubmit} className="w-1/2">
          <div className="p-5 flex  flex-col   gap-3 ">
            <input
              className="w-full  mr-2 appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="w-full  mr-2 appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <select
              className="w-full  appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
            >
              <option disabled selected>
                Select Price Range
              </option>
              <option value={1}>$</option>
              <option value={2}>$$</option>
              <option value={3}>$$$</option>
              <option value={4}>$$$$</option>
            </select>

            <button
              className="bg-blue-500 hover:bg-blue-700 text-white text-xl font-bold py-2 px-4 rounded"
              type="submit"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdatePage;
