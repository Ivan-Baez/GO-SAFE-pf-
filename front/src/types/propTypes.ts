import { promises } from "node:dns";

export interface IProudctDetailPago {
    paramas: Promise <{productID:string}>;
}