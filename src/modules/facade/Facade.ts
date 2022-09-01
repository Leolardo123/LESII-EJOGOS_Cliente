import Domain from "@modules/models/users/Domain";
import User from "@modules/models/users/User";
import { UserDAO } from "@modules/repositories/UserDAO";
import { IFacade } from "./IFacade";

export class Facade implements IFacade {
	create(entity: Domain): string {
		const user = entity as User;

		user.validate();
		
		const userDAO = new UserDAO();
		userDAO.insert(user);
		return "Cadastrado com sucesso";
	}
	update(entity: Domain): string {
		const user = entity as User;

		user.validate();
		
		const userDAO = new UserDAO();
		userDAO.update(user);
		return "Atualizado com sucesso";
	}
	delete(entity: Domain): string {
		const user = entity as User;

		user.validate();
		
		const userDAO = new UserDAO();
		userDAO.insert(user);
		return "Removido com sucesso";
	}
	query(entity: Domain): Domain[] {
		const user = entity as User;

		user.validate();
		
		const userDAO = new UserDAO();
		return userDAO.find(user);
	}
}