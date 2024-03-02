import { MdLogout } from "react-icons/md";

const Logout = () => {
  return (
    <>
      <img
        src="./java.svg"
        className="w-10 h-10 rounded-full border border-gray-800"
      />
      <div className="cursor-pointer flex items-center p-2 rounded-lg bg-glass mt-auto">
        <MdLogout size={22} />
      </div>
    </>
  );
};

export default Logout;
