import Domain from "@modules/models/Domain";
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

    setView(req: Request, res: any, result: Domain[] | Domain | string): void {
        if (typeof result === 'string') {
            res.status(201).json({ message: result });
        } else {
            if (result instanceof Array) {
                res.status(201).json(result.map((domain: Domain) => {
                    return domain.setView();
                }));
            } else {
                res.status(201).json(result.setView());
            }
        }
    }
}