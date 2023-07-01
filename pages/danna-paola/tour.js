import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import { useEffect, useRef, useState } from "react";

export default function Tour() {
  const [shows, setShows] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const cityRef = useRef();
  const stateRef = useRef();
  const venueRef = useRef();
  const dateRef = useRef();
  const ticketsRef = useRef();
  const ticketsVipRef = useRef();

  useEffect(() => {
    fetch("/api/danna/tour")
      .then((response) => response.json())
      .then((data) => setShows(data));
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);
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
    }).then((response) => {
      if (response.ok === true) {
        setIsLoading(false);
        const newShows = shows;
        newShows.push(show);
        setShows(newShows);
        cityRef.current.value = "";
        stateRef.current.value = "";
        venueRef.current.value = "";
        dateRef.current.value = "";
        ticketsRef.current.value = "";
        ticketsVipRef.current.value = "";
      } else {
        setIsLoading(false);
      }
    });
  };

  const deleteHandler = (showId) => {
    fetch(`/api/danna/tour/${showId}`, { method: "DELETE" }).then(() => {
      document.querySelector(`#show-${showId}`).remove();
    });
  };

  const updateHandler = (showId) => {
    fetch(`/api/danna/tour/update/${showId}`, { method: "PATCH" }).then(
      (response) => {
        console.log(response);
      }
    );
  };

  return (
    <>
      <Head>
        <title>TMBC - DANNA ADMIN</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.logoBox}>
          <Image
            className={styles.logo}
            src="/tmbc.svg"
            alt="tmbc Logo"
            width={180}
            height={37}
            priority
          />
        </div>
        <div className={styles.title}>
          <h2>DANNA PAOLA </h2>
        </div>
        <div className={styles.subtitle}>
          <h3>TOUR - SHOWS</h3>
        </div>
        <div className={styles.sectionContent}>
          <div className={styles.formBox}>
            <form onSubmit={submitHandler}>
              <label>Ciudad</label>
              <input type="text" name="city" ref={cityRef} required />
              <label>Estado</label>
              <input type="text" name="state" ref={stateRef} required />
              <label>Recito</label>
              <input type="text" name="venue" ref={venueRef} required />
              <label>Fecha</label>
              <input type="date" name="date" ref={dateRef} required />
              <label>Tickets</label>
              <input type="text" name="tickets" ref={ticketsRef} required />
              <label>Tickets VIP (Opcional)</label>
              <input type="text" name="tickets_vip" ref={ticketsVipRef} />
              {isLoading ? (
                <p>Creando...</p>
              ) : (
                <div className={styles.button}>
                  <button type="submit">CREAR SHOW</button>
                </div>
              )}
            </form>
          </div>
          <div className={styles.list}>
            {shows.length > 0 &&
              shows.map((show, idx) => (
                <article
                  key={show.id}
                  className={styles.item}
                  id={`show-${show.id}`}
                >
                  <div className={styles.content}>
                    <b style={{ fontFamily: "tmbc-bold" }}>{idx + 1}: </b>
                    {show.date.substring(0, 10)} {show.city} - {show.state} -
                    {show.venue}
                  </div>
                  <div className={styles.button}>
                    <button onClick={() => updateHandler()}>EDITAR</button>
                    <button onClick={() => deleteHandler(show.id)}>
                      BORRAR
                    </button>
                  </div>
                </article>
              ))}
          </div>
        </div>
      </main>
    </>
  );
}
