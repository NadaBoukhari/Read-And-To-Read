package com.curveball.booklogger.book;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class BookServiceImpl implements BookService {
    BookRepository bookRepository;

    public BookServiceImpl(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    @Override
    public List<Book> getBooks() {
        List<Book> books = new ArrayList<>();
        bookRepository.findAll().forEach(books::add);
        return books;
    }

    @Override
    public Book getBookById(UUID id) {
        return bookRepository.findById(id).get();
    }

    @Override
    public Book addBook(Book book) {
        return bookRepository.save(book);
    }

    @Override
    public void deleteBook(UUID id) {
        bookRepository.deleteById(id);
    }

    @Override
    public void updateBook(Book book, UUID id) {
        Book bookToUpdate = bookRepository.findById(id).get();
        bookToUpdate.setAuthor(book.getAuthor());
        bookToUpdate.setRating(book.getRating());
        bookToUpdate.setReview(book.getReview());
        bookToUpdate.setTitle(book.getTitle());
        bookRepository.save(bookToUpdate);
    }

}
