import { ICondition } from "../State";


export default class DefaultCondition implements ICondition {
    public check(): boolean {
        return true;
    }
}