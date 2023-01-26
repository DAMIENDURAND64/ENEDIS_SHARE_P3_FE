import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Footer from "../Footer/Footer";
import Navbar from "./Navbar";
import Loader from "../Loader";

interface IProps {
  children: ReactNode;
  sideBar?: ReactNode;
}

export default function Layout({ children, sideBar }: IProps) {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    if (router.isReady) {
      // setTimeout à enlever si on veut
      setTimeout(() => setIsLoading(false), 2000);
    }
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="h-screen w-screen flex justify-between items-center flex-col">
      <Navbar />
      <div className="flex justify-between w-full min-h-fit">
        {sideBar && sideBar}
        {children}
      </div>
      <div className="w-full sticky bottom-0">
        <Footer />
      </div>
    </div>
  );
}
