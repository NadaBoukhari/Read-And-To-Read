package com.curveball.booklogger.book;

import java.util.List;
import java.util.UUID;

public interface BookService {
    List<Book> getBooks();
    Book getBookById(UUID id);
    Book addBook(Book book);
    void deleteBook(UUID id);
    void updateBook(Book book, UUID id);
}
