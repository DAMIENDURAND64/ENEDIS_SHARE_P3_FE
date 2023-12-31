/* eslint-disable react/function-component-definition */
import Image from "next/image";
import Link from "next/link";
import Layout from "../src/components/layout/Layout";
import { NextPageWithLayout } from "./_app";

const FourOhFour: NextPageWithLayout = () => {
  return (
    <div className="w-full relative">
      <Image
        src="/assets/74e92a6f41ebcac61b0ec795c5842716.gif"
        fill
        alt="not found"
        className="brightness-50 object-cover"
      />
      <div className="absolute text-white-enedis top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <h1 className="font-enedis text-[150px]">404</h1>
      </div>
      <div className="absolute top-2/3 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white-enedis text-mob-3xl(welcome+name)">
        <Link href="/">
          <p>Go back home</p>
        </Link>
      </div>
    </div>
  );
};

FourOhFour.getLayout = (page) => <Layout>{page}</Layout>;

export default FourOhFour;
