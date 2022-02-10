import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useState } from "react";

export default function Home({ quotes }) {
  const [animePoster, setAnimePoster] = useState("");
  const [quote, setQuote] = useState(quotes);
  const [loading, SetLoading] = useState(false);

  async function getAnime() {
    const data = await fetch(
      `https://api.jikan.moe/v3/search/anime?q=${quote.anime}`
    );
    const res = await data.json();
    setAnimePoster(res.results[0].image_url);
  }
  getAnime();

  async function handleRefresh() {
    SetLoading(true);
    try {
      const res = await fetch("https://animechan.vercel.app/api/random");
      const quotes = await res.json();
      setQuote(quotes);
      getAnime();
    } catch (err) {
      return console.log("error: ", err);
    }
    SetLoading(false);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Anime Quotes</title>
        <meta
          name="description"
          content="Anime Quotes App Generated by create next app"
        />
      </Head>

      <div className="container">
        <h1>Anime Quotes</h1>
        <p>This is a simple app that generates random quotes from anime.</p>
        {loading ? (
          <div className="anime-box">
            <h3>
              <center>Loading...</center>
            </h3>
          </div>
        ) : (
          <div className="anime-box">
            <img src={animePoster} alt="anime" />
            <div className="quote-box">
              <h2>
                Anime - {quote.anime}
                <button onClick={handleRefresh}>Refresh</button>
              </h2>
              <blockquote>
                <cite>{quote.quote}</cite>
                <figcaption> - {quote.character}</figcaption>
              </blockquote>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const res = await fetch("https://animechan.vercel.app/api/random");
  const quotes = await res.json();
  return {
    props: {
      quotes,
    },
  };
}
