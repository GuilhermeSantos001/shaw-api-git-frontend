import { Users } from "../entities/users.entity";
import { PaginationType } from "../types/pagination.type";

export interface GithubGetUsersResponseDto {
  users: Users[];
  pagination: PaginationType[];
  length: number;
}
