import { useState, useContext } from "react";

import { RestaurantContext } from "../Contexts/RestaurantContexts";

import apiService from "../Services/apiservice";

const AddRestaurants = () => {
  const { addRestaurant } = useContext(RestaurantContext);

  const [name, setName] = useState();
  const [location, setLocation] = useState();
  const [priceRange, setPriceRange] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiService.post("/restaurants", {
        name,
        location,
        price_range: priceRange,
      });

      const [new_restaurant] = response.data.data.restaurants;
      addRestaurant(new_restaurant);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="max-w-full  bg-slate-700 flex justify-center items-center">
      <form onSubmit={handleSubmit}>
        <div className="p-5 flex justify-between gap-1">
          <input
            className="w-full md:w-1/3 mr-2 appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="w-full md:w-1/3 mr-2 appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <select
            className="w-full md:w-1/3 appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded"
            type="submit"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddRestaurants;
