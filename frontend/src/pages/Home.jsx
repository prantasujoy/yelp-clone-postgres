import { Suspense } from "react";
import { AddRestaurants, RestaurantList, Loader } from "../components";

const Home = () => {
  return (
    <>
      <div className="h-50 p-5 flex justify-center items-center  bg-slate-800 min-w-full">
        <p className="text-3xl font-medium text-white">Restaurant finder</p>
      </div>
      <div>
        <AddRestaurants />
        <Suspense fallback={<Loader />}>
          <RestaurantList />
        </Suspense>
      </div>
    </>
  );
};

export default Home;
