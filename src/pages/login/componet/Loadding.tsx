import BeanLoadding from "assets/image/BeanLoadding.gif";

const Loadding: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <img src={BeanLoadding} alt="loading" />
    </div>
  );
};

export default Loadding;
