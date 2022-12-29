import { react, useState, useEffect } from "react";

import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useSelector, useDispatch } from "react-redux";
import {
  decrement,
  increment,
  changeMyname,
  changeAbana,
  setLoad,
  getCartItems,
  AddCurrency,
} from "../features/changename/changenameslice";

export default function Home() {
  const count = useSelector((state) => state.changename.value);
  const lastname = useSelector((state) => state.changename.myname);
  const abana = useSelector((state) => state.changename.Myarray);
  const isload = useSelector((state) => state.changename.isLoading);
  const getCarts = useSelector((state) => state.changename.items);
  const dispatch = useDispatch();
  const [izina, setIzina] = useState("");

  const [country, setCountry] = useState("");
  const [description, setDescription] = useState("");
  const [code, setCode] = useState("");

  const handlePost = (e) => {
    e.preventDefault();

    // whatever you want to send
    const data = {
      user_id: "8b09ff5d-83b7-11ed-bd0b-48d224035647",
      currency_country: country,
      description: description,
      currency_code: code,
    };
    dispatch(AddCurrency(data));
  };

  useEffect(() => {
    dispatch(getCartItems());
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>React Learning redux</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Hallo, {lastname}</h1>
      <h2>State current value is {count}</h2>
      <button onClick={() => dispatch(increment())}>
        Click me! to increment
      </button>{" "}
      <br /> <br />
      <button onClick={() => dispatch(decrement())}>
        Click me! to decrement
      </button>
      <br /> <br />
      <h1>{izina}</h1>
      <input
        type="text"
        placeholder="Enter name"
        value={izina}
        onChange={(e) => {
          setIzina(e.target.value);
        }}
      />
      <br />
      <button onClick={() => dispatch(changeMyname(izina))}>Change name</button>
      <br />
      <ul>
        {abana.map((item, index) => {
          return (
            <li key={item.id}>
              {index + 1}. name: {item.names} and age: {item.age}
            </li>
          );
        })}
      </ul>
      <button
        onClick={() =>
          dispatch(changeAbana({ id: abana.length, names: "Gasaana", age: 23 }))
        }
      >
        Add push
      </button>
      <br />
      <button onClick={() => dispatch(setLoad())}>Load now</button>
      <br />
      <button
        onClick={() => {
          console.log(getCarts);
        }}
      >
        TEST APIS
      </button>
      <br />
      <img
        src="eclipse.gif"
        width="100px"
        style={{
          display: isload,
        }}
      />
      <ul>
        {getCarts.map((item, index) => {
          return (
            <li key={item.id}>
              {" "}
              Title: {item.title} and price: {item.price}{" "}
              <img src={item.img} width="50px" />
            </li>
          );
        })}
      </ul>
      <br />
      <br />
      <input
        type="text"
        placeholder="Enter country"
        onChange={(e) => {
          setCountry(e.target.value);
        }}
      />
      <br />
      <input
        type="text"
        placeholder="Description"
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      />
      <br />
      <input
        type="text"
        placeholder="Currency Code"
        onChange={(e) => {
          setCode(e.target.value);
        }}
      />
      <br />
      <br />
      <button onClick={handlePost}>Add new currency</button>
    </div>
  );
}
