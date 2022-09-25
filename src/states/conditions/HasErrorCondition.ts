import ErrorModel from "../../model/ErrorModel";
import { ICondition } from "../State";


export default class HasErrorCondition implements ICondition {
    public check(): boolean {
        return ErrorModel.hasError();
    }
}