import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

const BookCreate = () => {
  const [bookTitle, setBookTitle] = useState("");
  const [errors, setErrors] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    // console.log("enviando FORM...");
    // console.log(bookTitle);

    setSubmitting(true);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books`,
      {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
        },
        body: JSON.stringify({
          title: bookTitle,
        }),
      }
    );
    // console.log(res);

    if (res.ok) {
      // success
      // Para que desaparezcan los errores que se hayan producido
      setErrors([]);
      // Para resetear el VALUE del INPUT
      setBookTitle("");
      // Redirección
      return router.push("/books");
    }
    // error
    const data = await res.json();
    setErrors(data.errors);

    setSubmitting(false);
  }

  return (
    <>
      <Head>
        <title>Libro - Crear</title>
        <meta
          name="description"
          content="Aplicación de Libros a través de una API"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Libro - Crear</h1>
      {/* <p>{JSON.stringify(errors)}</p> */}
      <form onSubmit={handleSubmit}>
        <input
          onChange={(e) => setBookTitle(e.target.value)}
          value={bookTitle}
          disabled={submitting}
          type="text"
          data-cy="input-book-title"
        />
        <button disabled={submitting} data-cy="button-submit-book">
          {submitting ? "Creando..." : "Crear"}
        </button>
        {errors.title && (
          <span style={{ color: "red", display: "block" }}>{errors.title}</span>
        )}
        {/* <br />
        <p>{bookTitle}</p> */}
        <Link style={{ display: "block" }} href="/books">
          Listado
        </Link>
      </form>
    </>
  );
};

export default BookCreate;
