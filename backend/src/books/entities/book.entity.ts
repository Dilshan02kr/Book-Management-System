import { ObjectType, Field, ID, Int } from '@nestjs/graphql';

@ObjectType() 
export class Book {
  @Field(() => ID)
  id: string;

  @Field() 
  title: string;

  @Field()
  author: string;

  @Field(() => Int) 
  year: number;

  @Field()
  genre: string;
}
