import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { BooksService } from './books.service';
import { Book } from './entities/book.entity';
import { AddBookInput } from './dto/add-book.input';
import { GqlAuthGuard } from 'src/user-auth/gql-auth.guard';
import { UseGuards } from '@nestjs/common';

@UseGuards(GqlAuthGuard)
@Resolver(() => Book)
export class BooksResolver {
  constructor(private readonly booksService: BooksService) {}

  @Query(() => [Book], { name: 'books' })
  findAll() {
    return this.booksService.findAll();
  }

  @Query(() => Book, { name: 'book' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.booksService.findOne(id);
  }

  @Mutation(() => Book)
  addBook(@Args('data') data: AddBookInput) {
    return this.booksService.addBook(data);
  }

  @Mutation(() => Book)
  updateBook(
    @Args('id', { type: () => ID }) id: string,
    @Args('data') data: AddBookInput,
  ) {
    return this.booksService.update(id, data);
  }

  @Mutation(() => Boolean)
  removeBook(@Args('id', { type: () => ID }) id: string) {
    return this.booksService.remove(id);
  }
}
