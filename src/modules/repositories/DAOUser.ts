import User from "@modules/models/users/User";
import { DAOAbstract } from "./abstract/DAOAbstract";

export class DAOUser extends DAOAbstract<User> {
  constructor() {
    super(User);
  }
}
