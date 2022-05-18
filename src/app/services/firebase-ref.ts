const userId = 'ayn-rand';
const db = {collection: any}

// 1. Embedded, all data contained on single document, One-to-few

const authorWithAccount = db.collection('authors').doc(userId)

// 2. Shared Document ID
const author = db.collection('authors').doc(userId)
const account = db.collection('account').doc(userId);


// 3. Join related documents with different IDs,
const getAccount = async (userId: any) => {
  const snapshot = await db.collection('authors').doc(userId).get();
  const user = snapshot.data();

  return db.collection('accounts').doc(user.accountId)
}

// 1 to many

const authorId = 'dr-seuss';

// 4. Embedded One-to-Many
const authorWithBooks = db.collection('authors').doc(authorId)


// 5. Subcollection
const books = db.collection('authors').doc(authorId).collection('books');


// 6. Root Collection, requires index
const booksFrom1971 = db.collection('books')
  .where('author', '==', authorId)
  .where('published', '>', 1971);

// MANY TO MANY
// const authorId = 'dr-seuss';
const bookId   = 'lorax';

// 7. Middle Man Collection
const userReviews = db.collection('reviews').where('author', '==', authorId);
const bookReviews = db.collection('reviews').where('book', '==', bookId);

// Single read with composite key
const specificReview = db.collection('reviews').doc(`${bookId}_${authorId}`);


// 8. Map
// Reviews embadded on books
const bookWithReviews = db.collection('books').doc(bookId);
const userReviews = db.collection('books').orderBy('reviews.jeff-delaney');


// 9. Array
const books = db.collection('books').where('categories', 'array-contains', 'fiction');



// 10. Bucket
// Get a collection of documents with an array of IDs

const getLikedBooks = async() => {

  // Get books through user likes
  const userLikes = await db.collection('likes').orderBy('jeff-delaney').get();
  const bookIds = userLikes.docs.map(snap => snap.id);

  const bookReads = bookIds.map(id => db.collection('books').doc(id).get() );
  const books = Promise.all(bookReads)
}


// getLikedBooks()
