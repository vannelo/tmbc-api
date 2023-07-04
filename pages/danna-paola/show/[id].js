import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

export default function Show() {
  const router = useRouter();
  const { push } = router;
  const showId = router.query.id;
  const cityRef = useRef();
  const stateRef = useRef();
  const venueRef = useRef();
  const dateRef = useRef();
  const ticketsRef = useRef();
  const ticketsVipRef = useRef();
  const [show, setShow] = useState(null);
  const [date, setDate] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchShow = async () => {
      await fetch(`/api/danna/tour/${showId}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.length > 0) {
            setDate(new Date(data[0].date).toLocaleDateString("en-CA"));
            setShow(data[0]);
          }
        });
    };

    fetchShow();
  }, [showId]);

  const submitHandler = (e) => {
    setLoading(true);
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

    fetch(`/api/danna/tour/update/${showId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: formBody,
    }).then((response) => {
      if (response.ok === true) {
        setLoading(false);
        push("/danna-paola/tour");
      }
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
        <title>TMBC - DANNA - EDITAR SHOW</title>
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
        <div
          className={styles.sectionContent}
          style={{ justifyContent: "center" }}
        >
          <div className={styles.formBox}>
            <div className={styles.subtitle}>
              <h3>EDITAR SHOW</h3>
            </div>
            <form onSubmit={submitHandler}>
              <label>Ciudad</label>
              <input
                type="text"
                name="city"
                defaultValue={show?.city ?? ""}
                ref={cityRef}
                required
              />
              <label>Estado</label>
              <input
                type="text"
                name="state"
                defaultValue={show?.state ?? ""}
                ref={stateRef}
                required
              />
              <label>Recito</label>
              <input
                type="text"
                name="venue"
                defaultValue={show?.venue ?? ""}
                ref={venueRef}
                required
              />
              <label>Fecha</label>
              <input
                type="date"
                name="date"
                defaultValue={date}
                ref={dateRef}
                required
              />
              <label>Tickets</label>
              <input
                type="text"
                name="tickets"
                defaultValue={show?.tickets ?? ""}
                ref={ticketsRef}
                required
              />
              <label>Tickets VIP (Opcional)</label>
              <input
                type="text"
                name="tickets_vip"
                defaultValue={show?.tickets_vip ?? ""}
                ref={ticketsVipRef}
              />

              <div className={styles.button}>
                {loading ? (
                  <p>Actualizando...</p>
                ) : (
                  <button type="submit">ACTUALIZAR SHOW</button>
                )}
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
