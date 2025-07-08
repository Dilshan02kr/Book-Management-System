import { Injectable, NotFoundException } from '@nestjs/common';
import { Book } from './entities/book.entity';
import { AddBookInput } from './dto/add-book.input';

@Injectable()
export class BooksService {
  private books: Book[] = [];

  findAll(): Book[] {
    return this.books;
  }

  findOne(id: string): Book {
    const book = this.books.find((book) => book.id === id);
    if (!book) throw new NotFoundException(`Book with id ${id} not found`);
    return book;
  }

  getBooksByUser(userId: string): Book[] {
    const userBooks = this.books.filter((book) => book.userId === userId);
    return userBooks;
  }

  addBook(addBookInput: AddBookInput): Book {
    const newBook: Book = {
      id: Date.now().toString(),
      ...addBookInput,
    };
    this.books.push(newBook);
    return newBook;
  }

  update(id: string, updateBookInput: AddBookInput): Book {
    const bookIndex = this.books.findIndex((book) => book.id === id);
    if (bookIndex === -1)
      throw new NotFoundException(`Book with id ${id} not found`);

    this.books[bookIndex] = { id, ...updateBookInput };
    return this.books[bookIndex];
  }

  remove(id: string): boolean {
    const bookIndex = this.books.findIndex((book) => book.id === id);
    if (bookIndex === -1)
      throw new NotFoundException(`Book with id ${id} not found`);

    this.books.splice(bookIndex, 1);
    return true;
  }
}
