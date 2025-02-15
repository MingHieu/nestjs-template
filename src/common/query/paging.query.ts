import { Type } from 'class-transformer';

export class PagingQuery {
  @Type(() => Number)
  page: number = 0;

  @Type(() => Number)
  pageSize: number = 10;
}
