import { useState, createContext } from "react";

export const RestaurantContext = createContext();

const RestaurantProvider = ({ children }) => {
  const [restaurants, setRestaurants] = useState([]);

  const addRestaurant = (new_restaurants) => {
    setRestaurants([...restaurants, new_restaurants]);
  };

  const deleteRestaurant = (id) => {
    const filtered_restaurants = restaurants.filter(
      (restaurants) => restaurants.id != id
    );
    setRestaurants(filtered_restaurants);
  };

  const updateRestaurant = (id, data) => {
    const updated_data = restaurants.map((restaurant) => {
      if (restaurant.id == id) {
        return data;
      } else {
        return restaurant;
      }
    });

    setRestaurants(updated_data);
  };
  return (
    <RestaurantContext.Provider
      value={{
        restaurants,
        setRestaurants,
        addRestaurant,
        deleteRestaurant,
        updateRestaurant,
      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
};

export default RestaurantProvider;
