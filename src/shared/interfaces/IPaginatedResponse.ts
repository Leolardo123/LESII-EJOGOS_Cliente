import Domain from "@modules/models/Domain";

interface IPaginatedResponse<T extends Domain> {
  results: T[];
  total: number;
  page: number;
  limit: number;
}

export default IPaginatedResponse;
