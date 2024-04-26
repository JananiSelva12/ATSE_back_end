import { NextFunction, Router, Request, Response } from "express";
import { KeyValuePair } from "./keyValuePair";
import { ListingQuery } from "./custom";

interface RouteResolvers {
  method: "get" | "post" | "put" | "delete";
  route: string;
  middleware: Array<(req: Request, res: Response, next: NextFunction) => any>;
  handler: (req: Request, res: Response, next: NextFunction) => Promise<any>;
  view: string;
  context?: any;
}

interface Api {
  path: string;
  childRoutes: Router;
}

interface RecordListingParams {
  offset?: number;
  limit?: number;
  orderBy?: string;
  searchTerm?: string;
  orderDirection?: "ASC" | "DESC";
  oldestDateTime?: Date;
  latestDateTime?: Date;
}

interface SearchTermParams {
  searchTerm?: string;
  studentId?: string;
}

interface RecordListing<T> {
  data: T[];
  total: number;
}

interface FormError {
  key: string;
  failValue: string | number;
  description: string;
  message?: string; // message is intended to be used as-is for FE
}

interface listingAndFilteringParams {
  offset?: number;
  limit?: number;
  searchTerm?: string;
}

export {
  KeyValuePair,
  RouteResolvers,
  Api,
  RecordListingParams,
  RecordListing,
  FormError,
  ListingQuery,
  SearchTermParams,
  listingAndFilteringParams,
};
