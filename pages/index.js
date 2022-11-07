import Head from "next/head";
import styles from "../styles/Home.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Aplicación de Libros</title>
        <meta
          name="description"
          content="Aplicación de Libros a través de una API"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Aplicación de Libros</h1>
      <Link href="/books" data-cy="link-to-booksList">
        Listado de libros
      </Link>
    </div>
  );
}
