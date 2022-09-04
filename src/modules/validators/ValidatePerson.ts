import { AddressTypesEnum } from "@modules/models/address/enum/AddressTypesEnum";
import AppError from "@shared/errors/AppError";
import Person from "../models/users/Person";
import { IValidate } from "./IValidate";
import { ValidateAddress } from "./ValidateAddress";
import { ValidateCPF } from "./ValidateCPF";
import { ValidateGender } from "./ValidateGender";
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
        if(!entity.name){
            throw new Error('Nome é um campo obrigatório (Pessoa).');
        }
        if(!entity.cpf){
            throw new Error('CPF é um campo obrigatório (Pessoa).');
        } else {
            this.validateCPF.validate(entity);
        }
        if(!entity.gender || !entity.gender.id){
            throw new Error('Gênero é um campo obrigatório (Pessoa).');
        }
        if(!entity.phone){
            throw new Error('Telefone é um campo obrigatório (Pessoa).');
        }
        if(entity.phone){
            this.validatePhone.validate(entity.phone);
        }
        if(!entity.addresses || entity.addresses.length <= 0) {
            throw new AppError('Pelo menos um endereço deve ser cadastrado')
        }
        if(entity.addresses){
            let hasDelivery = false;
            let hasPayment = false;
            entity.addresses.map((address, index)=>{
                try {
                    this.validateAddress.validate(address);
                    hasDelivery = !hasDelivery ? 
                    (AddressTypesEnum.both == address.address_type.id) ||
                    (AddressTypesEnum.delivery == address.address_type.id)
                    : false;

                    hasPayment = !hasPayment ? 
                    (AddressTypesEnum.both == address.address_type.id) ||
                    (AddressTypesEnum.payment == address.address_type.id)
                    : false;
                } catch(err: any){
                    throw new Error(`Endereço ${index+1} ${err}`)
                }  
            })
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