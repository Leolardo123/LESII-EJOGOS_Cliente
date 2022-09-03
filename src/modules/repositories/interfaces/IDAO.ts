import Domain from "@modules/models/Domain";

export interface IDAO {
  insert(entity: Domain): void;
  find(entity: Domain): Domain[];
  update(entity: Domain): void;
  remove(entity: Domain): void;
}
