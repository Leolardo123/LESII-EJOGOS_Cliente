import IWhereParams from "./IWhereParams";

interface IPaginatedtRequest {
  page?: number;
  limit?: number;
  whereParams?: IWhereParams;
}

export default IPaginatedtRequest;
