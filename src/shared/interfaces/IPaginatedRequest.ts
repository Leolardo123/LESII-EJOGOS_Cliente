import Domain from "@modules/models/Domain";
import { DeepPartial } from "typeorm";

interface IPaginatedtRequest<T extends Domain> {
  page?: number;
  limit?: number;
  filters?: DeepPartial<T>;
}

export default IPaginatedtRequest;
