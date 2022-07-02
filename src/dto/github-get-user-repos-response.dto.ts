import { Repos } from "../entities/repos.entity";
import { PaginationType } from "../types/pagination.type";

export interface GithubGetUserReposResponseDto {
  repos: Repos[];
  pagination: PaginationType[];
  length: number;
}
