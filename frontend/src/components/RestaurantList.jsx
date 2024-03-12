import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { RestaurantContext } from "../Contexts/RestaurantContexts";
import apiService from "../Services/apiservice";

const RestaurantList = () => {
  const navigate = useNavigate();

  const { restaurants, setRestaurants, deleteRestaurant } =
    useContext(RestaurantContext);

  const { isPending, error } = useQuery({
    queryKey: ["restaurantData"],
    queryFn: async () => {
      const response = await apiService.get("/restaurants");

      setRestaurants(response.data.data.restaurants);
      return response.data.data.restaurants;
    },
  });

  const handleDelete = async (e, id) => {
    e.stopPropagation();

    try {
      await apiService.remove(`/restaurants/${id}`);
      deleteRestaurant(id);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = (e, id) => {
    e.stopPropagation();
    navigate(`/update/${id}`);
  };

  const handleDetails = (id) => {
    navigate(`/details/${id}`);
  };

  const tableData = restaurants?.map((restaurant, index) => {
    return (
      <>
        <tr
          className="bg-slate-600 text-white hover:bg-slate-700"
          key={index}
          onClick={() => handleDetails(restaurant.id)}
        >
          <td className="px-4 py-2">{restaurant.name}</td>
          <td className="px-4 py-2">{restaurant.location}</td>
          <td className="px-4 py-2">{"$".repeat(restaurant.price_range)}</td>
          <td className="px-4 py-2">4.5</td>
          <td className="px-4 py-2">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded"
              onClick={(e) => handleUpdate(e, restaurant.id)}
            >
              Edit
            </button>
          </td>
          <td className="px-4 py-2">
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded"
              onClick={(e) => handleDelete(e, restaurant.id)}
            >
              Delete
            </button>
          </td>
        </tr>
      </>
    );
  });

  return (
    <div className="flex justify-center mt-5 min-w-full overflow-x-auto">
      <table className="table-auto bg-slate-700 shadow-md">
        <thead>
          <tr className="bg-slate-600 text-white">
            <th className="px-4 py-2">Restaurant</th>
            <th className="px-4 py-2">Location</th>
            <th className="px-4 py-2">Price Range</th>
            <th className="px-4 py-2">Ratings</th>
            <th className="px-4 py-2">Edit</th>
            <th className="px-4 py-2">Delete</th>
          </tr>
        </thead>

        <tbody>{tableData}</tbody>
      </table>
    </div>
  );
};

export default RestaurantList;
