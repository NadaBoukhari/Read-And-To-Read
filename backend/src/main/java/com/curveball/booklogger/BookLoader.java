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
        book1.setImg_url("http://books.google.com/books/content?id=NdAmDwAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api");
        book1.setDescription("Aging and reclusive Hollywood movie icon Evelyn Hugo is finally ready to tell the truth about her glamorous and scandalous life. But when she chooses unknown magazine reporter Monique Grant for the job, no one in the journalism community is more astounded than Monique herself. Why her? Why now? ");
        Book book2 = new Book();
        book2.setTitle("The Song of Achilles");
        book2.setRating(4.0);
        book2.setAuthor("Madeline Miller");
        book2.setReview("Okay");
        book2.setImg_url("http://books.google.com/books/content?id=szMU9omwV0wC&printsec=frontcover&img=1&zoom=1&source=gbs_api");
        book2.setDescription("WINNER OF THE ORANGE PRIZE FOR FICTION 2012 Greece in the age of heroes. Patroclus, an awkward young prince, has been exiled to the court of King Peleus and his perfect son Achilles. Despite their differences, Achilles befriends the shamed prince, and as they grow into young men skilled in the arts of war and medicine, their bond blossoms into something deeper - despite the displeasure of Achilles's mother Thetis, a cruel sea goddess. But when word comes that Helen of Sparta has been kidnapped, Achilles must go to war in distant Troy and fulfill his destiny. Torn between love and fear for his friend, Patroclus goes with him, little knowing that the years that follow will test everything they hold dear.");
        Book book3 = new Book();
        book3.setTitle("The Humans");
        book3.setRating(5.0);
        book3.setAuthor("Matt Haig");
        book3.setReview("Excellent");
        book3.setImg_url("http://books.google.com/books/content?id=Z0MTlFNNQuoC&printsec=frontcover&img=1&zoom=1&source=gbs_api");
        book3.setDescription("Regarding humans unfavorably upon arriving on Earth, a reluctant extraterrestrial assumes the identity of a Cambridge mathematician before realizing that there's more to the human race than he suspected.");
        bookService.addBook(book1);
        bookService.addBook(book2);
        bookService.addBook(book3);
    }
}
