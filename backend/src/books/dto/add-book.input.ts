import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class AddBookInput {
  @Field()
  title: string;

  @Field()
  author: string;

  @Field(() => Int)
  year: number;

  @Field()
  genre: string;
}
