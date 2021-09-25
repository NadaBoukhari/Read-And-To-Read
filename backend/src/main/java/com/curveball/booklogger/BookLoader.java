package com.curveball.booklogger;

import com.curveball.booklogger.book.Book;
import com.curveball.booklogger.book.BookService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class BookLoader implements CommandLineRunner {
    public final BookService bookService;

    public BookLoader(BookService bookService) {
        this.bookService = bookService;
    }

    public void run(String... args) throws Exception {
        loadBooks();
    }

    private void loadBooks() {
        Book book1 = new Book();
        book1.setTitle("The Seven Husbands Of Evelyn Hugo");
        book1.setRating(4.5);
        book1.setAuthor("Taylor Jenkins Reid");
        book1.setReview("Great");
        book1.setImg_url("http://books.google.com/books/content?id=NdAmDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api");
        Book book2 = new Book();
        book2.setTitle("The Song of Achilles");
        book2.setRating(4.0);
        book2.setAuthor("Madeline Miller");
        book2.setReview("Okay");
        book2.setImg_url("http://books.google.com/books/content?id=szMU9omwV0wC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api");
        Book book3 = new Book();
        book3.setTitle("The Humans");
        book3.setRating(5.0);
        book3.setAuthor("Matt Haig");
        book3.setReview("Excellent");
        book3.setImg_url("http://books.google.com/books/content?id=Z0MTlFNNQuoC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api");
        bookService.addBook(book1);
        bookService.addBook(book2);
        bookService.addBook(book3);
    }
}
