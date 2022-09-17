import { AddressTypesEnum } from "@modules/models/address/enum/AddressTypesEnum";
import { DAOGender } from "@modules/repositories/DAOGender";
import Person from "../models/users/Person";
import { IValidate } from "./IValidate";
import { ValidateAddress } from "./ValidateAddress";
import { ValidateCPF } from "./ValidateCPF";
import { ValidatePhone } from "./ValidatePhone";

export class ValidatePerson implements IValidate{
    constructor(
        private validateAddress: ValidateAddress,
        private validatePhone: ValidatePhone,
        private validateCPF: ValidateCPF,
    ){}
    async validate(entity: Person): Promise<void> {
        if(!(entity instanceof Person)){
            throw new Error('Entidade inválida, esperava pessoa.');
        }

        if(!entity.id){
            if(!entity.name){
                throw new Error('Nome é um campo obrigatório (Pessoa).');
            }
            if(!entity.cellphone){
                throw new Error('Celular é obrigatório (Pessoa).');
            }
            if(!entity.cpf){
                throw new Error('CPF é um campo obrigatório (Pessoa).');
            }
            if(!entity.gender || !entity.gender.id){
                throw new Error('Gênero é um campo obrigatório (Pessoa).');
            }else {
                const DAOgen =  new DAOGender();
                const genderExists = await DAOgen.findOne({ where: { id: entity.gender.id }});
                if(!genderExists){
                    throw new Error('Gênero escolhido não é válido (Pessoa).');
                }
            }
            if(!entity.phone){
                throw new Error('Telefone é um campo obrigatório (Pessoa).');
            }
            if(!entity.addresses){
                throw new Error('Endereço é um campo obrigatório (Pessoa).');
            }
        }

        if(entity.cpf){
            await this.validateCPF.validate(entity);
        }
        if(entity.phone){
            await this.validatePhone.validate(entity.phone);
        }
        if(entity.addresses){
            if (entity.addresses.length <= 0) {
                throw new Error('Pelo menos um endereço deve ser cadastrado')
            }
            let hasDelivery = false;
            let hasPayment = false;
            const promise = entity.addresses.map(async (address, index)=>{
                try {
                    await this.validateAddress.validate(address);
                    if(
                        (AddressTypesEnum.both == address.address_type.id) ||
                        (AddressTypesEnum.delivery == address.address_type.id)
                    ){
                        hasDelivery = true
                    }

                    if(
                        (AddressTypesEnum.both == address.address_type.id) ||
                        (AddressTypesEnum.payment == address.address_type.id)
                    ){
                        hasPayment = true
                    }
                } catch(err: any){
                    throw new Error(`Endereço ${index+1} ${err}`)
                }  
            })
            await Promise.all(promise);
            let addressTypesError;
            if(!hasDelivery){
                addressTypesError = 'Pelo menos um endereço de entrega deve ser cadastrado.'
            }
            if(!hasPayment){
                addressTypesError = 'Pelo menos um endereço de cobrança deve ser cadastrado.'
            }
            if(addressTypesError){
                throw new Error(addressTypesError);
            }
        }
    }
}