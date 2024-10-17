import Header from "./component/Header";
import Sidebar from "./component/Sidebar";
import BreadCrumbs from "../components/BreadCrumbs";

const layout = ({ children }: any) => {
  return (
    <div className="w-full h-[100vh] bg-slate-950">
      <Header />
      <div className="w-full h-[90%] bg-slate-900 flex items-center justify-around">
        <Sidebar />

        <div className="w-[78%] h-[98%] bg-slate-950 rounded-xl border border-slate-800 shadow-inner">
          <div className="w-full h-[10%] rounded-t-xl flex items-center justify-around">
            <div className="w-[65%] h-[100%]">

            </div>
            <div className="w-[auto] h-[100%] flex items-center justify-end pr-3">
            <h2>
              <BreadCrumbs
                homeElement={"Home"}
                separator={<span> | </span>}
                activeClasses="text-amber-500"
                containerClasses="flex text-slate-300 text-sm"
                listClasses="hover:underline mx-2 font-bold"
                capitalizeLinks
              />
            </h2>
            </div>
          </div>
          <div className="w-full h-[90%] rounded-b-xl flex items-center justify-around bg-slate-900">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default layout;
