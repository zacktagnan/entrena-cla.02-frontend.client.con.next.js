import Head from "next/head";
import Link from "next/link";

export async function getStaticProps({ params }) {
  // con context
  // Este es el ID de la petición
  // console.log(context.params.bid);
  // const res = await fetch(
  //   `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books/${context.params.bid}`
  // );
  // o, mejor, con { params }
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books/${params.bid}`
  );
  // console.log(res);

  const data = await res.json();
  // console.log(data);

  return {
    props: {
      // book: [],
      book: data,
    },
  };
}

export async function getStaticPaths() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books`);

  const data = await res.json();

  return {
    paths: data.map((book) => ({
      params: { bid: String(book.id) },
    })),
    fallback: false,
  };
}

const BookDetail = ({ book }) => {
  return (
    <div>
      <Head>
        <title>Libro - Detalle</title>
        <meta
          name="description"
          content="Aplicación de Libros a través de una API"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>{book.title}</h1>
      <Link href="/books">Listado</Link>
    </div>
  );
};

export default BookDetail;
