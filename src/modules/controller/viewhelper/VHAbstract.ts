import Domain from "@modules/models/Domain";
import IPaginatedResponse from "@shared/interfaces/IPaginatedResponse";
import { Request } from "express";
import { IGetEntity } from "./interface/IViewHelper";

export abstract class VHAbstract {
    abstract getEntity(req: Request): Domain;
    findEntity(req: Request): IGetEntity {
        const entity = this.getEntity(req);
        return {
            entity,
            whereParams: { where: entity }
        }
    }

    setView(req: Request, res: any, result: IPaginatedResponse<Domain> | Domain[] | Domain | string): void {
        if (typeof result === 'string') {
            return res.status(201).json({ message: result });
        }

        if (result instanceof Array) {
            return res.status(201).json(result.map((domain: Domain) => {
                return domain.setView();
            }));
        }

        if (result instanceof Domain) {
            return res.status(201).json(result.setView());
        }

        return res.status(201).json({
            ...result,
            results: result.results.map((domain: Domain) => {
                return domain.setView();
            })
        });
    }
}