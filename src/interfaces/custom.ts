export interface ListingQuery {
  offset?: number;
  limit?: number;
  q?: string;
  orderBy?: string;
  orderDirection?: "ASC" | "DESC";
  oldestDateTime?: Date;
  latestDateTime?: Date;
}
