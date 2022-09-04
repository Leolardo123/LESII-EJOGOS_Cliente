import Domain from "@modules/models/Domain";

export interface IDAO {
  insert(entity: Domain): Promise<Domain>;
  find(where: string): Promise<Domain[]>;
  update(entity: Domain): Promise<Domain>;
  remove(entity: Domain): Promise<void>;
}
