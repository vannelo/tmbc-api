import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useEffect, useRef, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const cityRef = useRef();
  const stateRef = useRef();
  const venueRef = useRef();
  const dateRef = useRef();
  const ticketsRef = useRef();
  const ticketsVipRef = useRef();
  const [shows, setShows] = useState([]);

  useEffect(() => {
    fetch("/api/danna/tour")
      .then((response) => response.json())
      .then((data) => setShows(data));
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    const show = {
      city: cityRef.current.value,
      state: stateRef.current.value,
      venue: venueRef.current.value,
      date: dateRef.current.value,
      tickets: ticketsRef.current.value,
      tickets_vip: ticketsVipRef.current.value,
    };

    let formBody = [];
    for (const property in show) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(show[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    fetch("/api/danna/tour", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: formBody,
    }).then((response) => console.log(response.body));
  };
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.center}>
          <Image
            className={styles.logo}
            src="/next.svg"
            alt="Next.js Logo"
            width={180}
            height={37}
            priority
          />
          <div className={styles.thirteen}>
            <Image
              src="/thirteen.svg"
              alt="13"
              width={40}
              height={31}
              priority
            />
          </div>
        </div>
        <div className={styles.form}>
          <h4>DANNA TOUR</h4>
          <br></br>
          {shows.length &&
            shows.map((i) => (
              <div key={i.id}>
                {i.city} - {i.state} - {i.venue} - {i.date} -
                <button>BORRAR</button>
                <br></br>
                <br></br>
              </div>
            ))}
          <h4>AGREGAR SHOW</h4>
          <br></br>
          <form onSubmit={submitHandler}>
            <input
              type="text"
              name="city"
              placeholder="city"
              ref={cityRef}
              required
            />
            <input
              type="text"
              name="state"
              placeholder="state"
              ref={stateRef}
              required
            />
            <input
              type="text"
              name="venue"
              placeholder="venue"
              ref={venueRef}
              required
            />
            <input
              type="text"
              name="date"
              placeholder="date"
              ref={dateRef}
              required
            />
            <input
              type="text"
              name="tickets"
              placeholder="tickets"
              ref={ticketsRef}
              required
            />
            <input
              type="text"
              name="tickets_vip"
              placeholder="tickets_vip"
              ref={ticketsVipRef}
              required
            />
            <button type="submit">CREAR SHOW</button>
          </form>
        </div>
      </main>
    </>
  );
}
