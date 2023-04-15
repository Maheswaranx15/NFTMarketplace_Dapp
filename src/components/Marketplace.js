import Navbar from "./Navbar";
import CATTile from "./categoryTile";
import { useState, useEffect } from "react";
import { db } from "../firebase-config";
import { collection, getDocs } from "firebase/firestore";

export default function Marketplace() {
  const [category, setCategory] = useState([]);
  const categoryCollectionRef = collection(db, "category");

  useEffect(() => {
    const getCategory = async () => {
      const data = await getDocs(categoryCollectionRef);
      console.log(data);
      setCategory(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getCategory();
  }, []);



  return (
    <div>
      <Navbar></Navbar>
      <div className="flex flex-col place-items-center mt-20">
        <div className="md:text-xl font-bold text-white">Collections</div>
        <div className="flex mt-5 justify-between flex-wrap max-w-screen-xl text-center">
          {category.map((value, index) => {
           return <CATTile data={value} key={index} ></CATTile>;
          })}
        </div>

      </div>
    </div>
  );
}
