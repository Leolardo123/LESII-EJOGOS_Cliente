import Domain from "@modules/models/Domain";
import { DAOAddress } from "@modules/repositories/DAOAddress";
import { DAOAddressType } from "@modules/repositories/DAOAddressType";
import { DAOBrand } from "@modules/repositories/DAOBrand";
import { DAOCard } from "@modules/repositories/DAOCard";
import { DAOCart } from "@modules/repositories/DAOCart";
import { DAOCartItem } from "@modules/repositories/DAOCartItem";
import { DAOGender } from "@modules/repositories/DAOGender";
import { DAOPerson } from "@modules/repositories/DAOPerson";
import { DAOPlaceType } from "@modules/repositories/DAOPlaceType";
import { DAOProduct } from "@modules/repositories/DAOProducts";
import { DAOPurchase } from "@modules/repositories/DAOPurchase";
import { DAOUser } from "@modules/repositories/DAOUser";
import { IDAO } from "@modules/repositories/interfaces/IDAO";
import { IValidate } from "@modules/validators/IValidate";
import { ValidateAddress } from "@modules/validators/ValidateAddress";
import { ValidateBrand } from "@modules/validators/ValidateBrand";
import { ValidateCard } from "@modules/validators/ValidateCard";
import { ValidateCart } from "@modules/validators/ValidateCart";
import { ValidateCartItem } from "@modules/validators/ValidateCartItem";
import { ValidateCPF } from "@modules/validators/ValidateCPF";
import { ValidateGender } from "@modules/validators/ValidateGender";
import { ValidatePassword } from "@modules/validators/ValidatePassword";
import { ValidatePerson } from "@modules/validators/ValidatePerson";
import { ValidatePhone } from "@modules/validators/ValidatePhone";
import { ValidateProduct } from "@modules/validators/ValidateProduct";
import { ValidatePurchase } from "@modules/validators/ValidatePurchase";
import { ValidateUser } from "@modules/validators/ValidateUser";
import IHash from "@shared/interfaces/IHash";
import { createConnections } from "typeorm";
import { IFacade } from "./IFacade";


export class Facade implements IFacade {
	private validators: IHash<IValidate> = {};
	private daos: IHash<IDAO<Domain>> = {};
	private isConected = false;

	constructor(){
		const validateAddress = new ValidateAddress();
		const validatePhone = new ValidatePhone();
		const validateCPF = new ValidateCPF();
		const validateGender = new ValidateGender();
		const validatePerson = new ValidatePerson(
			validateAddress, 
			validatePhone,
			validateCPF
		);
		const validatePassword = new ValidatePassword();
		const validateUser = new ValidateUser(
			validatePerson, 
			validatePassword
		);
		const validateCard = new ValidateCard();
		const validateProduct = new ValidateProduct();
		const validateBrand = new ValidateBrand();
		const validateCartItem = new ValidateCartItem();
		const validateCart = new ValidateCart(validateCartItem);

		const validatePurchase = new ValidatePurchase(
			validateCart,
			validateAddress,
			validateCard,
		);

		this.validators.address = validateAddress;
		this.validators.person = validatePerson;
		this.validators.user = validateUser;
		this.validators.gender = validateGender;
		this.validators.card = validateCard;
		this.validators.product = validateProduct;
		this.validators.brand = validateBrand;
		this.validators.cartitem = validateCartItem;
		this.validators.cart = validateCart;
		this.validators.purchase = validatePurchase;

		console.clear();
		console.log('[BANCO DE DADOS 🎲] Conectando com o banco de dados...');
		createConnections()
		.then(() => {
			console.clear();
			console.log('[BANCO DE DADOS 🎲] Conectado com sucesso!');

			this.daos.user = new DAOUser() as any;
			this.daos.person = new DAOPerson() as any;
			this.daos.gender = new DAOGender() as any;
			this.daos.address = new DAOAddress() as any;
			this.daos.addresstype = new DAOAddressType() as any;
			this.daos.placetype = new DAOPlaceType() as any;
			this.daos.card = new DAOCard() as any;
			this.daos.brand = new DAOBrand() as any;
			this.daos.product = new DAOProduct() as any;
			this.daos.cart = new DAOCart() as any;
			this.daos.cartitem = new DAOCartItem() as any;
			this.daos.purchase = new DAOPurchase() as any;

			this.isConected = true
		})
		.catch(err => console.log(err));
	}

	async create(entity: Domain): Promise<string> {
		if(!this.isConected){
			throw new Error('O Sistema ainda está inicializando...')
		}

		const entityName = entity.constructor.name.toLowerCase();

		if(
			!this.daos[entityName] ||
			!this.validators[entityName]
		){
			throw new Error('Tipo de pedido não encontrado');
		}

		const validatorInstance = this.validators[entityName];
		await validatorInstance.validate(entity);
		const daoInstance = this.daos[entityName];
		await daoInstance.save(entity);

		return 'Cadastrado com sucesso';
	}
	
	async update(entity: Domain): Promise<string> {
		if(!this.isConected){
			throw new Error('O Sistema ainda está inicializando...')
		}

		const entityName = entity.constructor.name.toLowerCase();

		if(
			!this.daos[entityName] ||
			!this.validators[entityName]
		){
			throw new Error('Tipo de pedido não encontrado');
		}

		const validatorInstance = this.validators[entityName];
		await validatorInstance.validate(entity);
		const daoInstance = this.daos[entityName];
		const entityExists = await daoInstance.findOne({ 
			where: { 
				id: entity.id 
			} 
		});

		if(!entityExists) throw new Error('Não encontrado');
		Object.assign(entityExists, entity);

		await daoInstance.save(entityExists);

		return 'Atualizado com sucesso';
	}
	
	async delete(entity: Domain): Promise<string> {
		if(!this.isConected){
			throw new Error('O Sistema ainda está inicializando...')
		}

		const entityName = entity.constructor.name.toLowerCase();

		if(
			!this.daos[entityName]
		){
			throw new Error('Tipo de pedido não encontrado');
		}

		if(!entity.id) throw new Error('Item não selecionado');

		const daoInstance = this.daos[entityName];
		await daoInstance.remove(entity);

		return 'Removido com sucesso';
	}

	async findOne(entity: Domain, relations: string[]): Promise<Domain | undefined | null> {
		if(!this.isConected){
			throw new Error('O Sistema ainda está inicializando...')
		}

		const entityName = entity.constructor.name.toLowerCase();

		if(
			!this.daos[entityName]
		){
			throw new Error('Tipo de pedido não encontrado');
		}

		const daoInstance = this.daos[entityName];
		return await daoInstance.findOne({ where: entity, relations});
	}

	async findMany(entity: Domain, relations: string[]): Promise<Domain[]> {
		if(!this.isConected){
			throw new Error('O Sistema ainda está inicializando...')
		}

		const entityName = entity.constructor.name.toLowerCase();

		if(
			!this.daos[entityName]
		){
			throw new Error('Tipo de pedido não encontrado');
		}
		
		const daoInstance = this.daos[entityName];
		return await daoInstance.findMany({ where: entity, relations });
	}
}