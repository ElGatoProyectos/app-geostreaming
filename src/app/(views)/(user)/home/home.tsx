import Delivery from "./delivery";
import Request from "./request";

const Home = () => {
  return (
    <div className="flex flex-col gap-8">
      <Delivery />
      <Request />
    </div>
  );
};

export default Home;
