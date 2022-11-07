/**/
import Head from "next/head";
import Link from "next/link";

export async function getStaticProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books`);
  // console.log(res);

  const data = await res.json();
  // console.log(data);

  return {
    props: {
      // books: [],
      books: data,
    },
  };
}

const BooksList = ({ books }) => {
  async function handleDelete(e, bookId) {
    e.preventDefault();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books/${bookId}`,
      {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
        },
        body: JSON.stringify({
          _method: "DELETE",
        }),
      }
    );

    if (res.ok) {
      window.location.href = "/books";
    }
  }

  return (
    <>
      <Head>
        <title>Libros - Listado</title>
        <meta
          name="description"
          content="Aplicación de Libros a través de una API"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* <pre>{JSON.stringify(books)}</pre> */}
      <h1>Libros - Listado</h1>
      <ul data-cy="books-list">
        {books.map((book) => (
          <li key={`book-${book.id}`}>
            <Link
              href={`/books/${book.id}`}
              data-cy={`link-to-visit-book-${book.id}`}
            >
              {book.title}
            </Link>
            {" - "}
            <Link
              href={`/books/${book.id}/edit`}
              data-cy={`link-to-edit-book-${book.id}`}
            >
              Editar
            </Link>
            {" - "}
            <form
              onSubmit={(e) => handleDelete(e, book.id)}
              style={{ display: "inline" }}
            >
              <button data-cy={`link-to-delete-book-${book.id}`}>Borrar</button>
            </form>
          </li>
        ))}
      </ul>
      <Link href="/books/create">Crear uno</Link>
    </>
  );
};

export default BooksList;
