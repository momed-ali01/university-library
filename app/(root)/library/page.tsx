import BookList from "@/components/BookList";
import BookOverview from "@/components/BookOverview";
import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { auth } from "@/auth";
import { desc } from "drizzle-orm";

const Library = async () => {
  const session = await auth();

  const latestBooks = (await db
    .select()
    .from(books)
    .orderBy(desc(books.createdAt))) as Book[];

  return (
    <>
      {latestBooks.length > 0 ? (
        <BookOverview {...latestBooks[0]} userId={session?.user?.id ?? ""} />
      ) : (
        <p>No books available</p>
      )}

      <BookList
        title="Latest Books"
        books={latestBooks.slice(1)}
        containerClassName="mt-28"
      />
    </>
  );
};

export default Library;
