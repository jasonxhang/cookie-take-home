http://book-search-jh.herokuapp.com/

Book search uses Open Library's various APIs to display results for a book title search and view details on a specific book.

A particular quirk of the Open Library APIs is that book data may vary from entry to entry so not all data points exist for a swath of entries. For instance, a particular book version may none of up to all of the following identifier IDs necessary to use the Book Details API route: OLID, ISBN, LCCN, OCLC. 

To further complicate, some of the data returned from the specific Book API doesn't even return author name. To remedy the former issue, a ternary function is used to cycle through all the identifiers a book returns to use for the specific Book Details lookup. And the initial book results metainfo is retained in redux to fill in information that may not be returned back from that particular Book Detail lookup such as author name, subtitle, or book details. 

