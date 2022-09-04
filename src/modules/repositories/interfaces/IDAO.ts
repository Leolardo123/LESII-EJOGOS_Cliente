import Domain from "@modules/models/Domain";

export interface IDAO {
  insert(entity: Domain): Promise<void>;
  find(where: string): Promise<Domain[]>;
  update(entity: Domain): Promise<void>;
  remove(entity: Domain): Promise<void>;
}
