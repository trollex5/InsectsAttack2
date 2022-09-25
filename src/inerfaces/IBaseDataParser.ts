export interface IBaseDataParser<T> {
    check(data: T): boolean;
    parse(data: T): T[] | T;
}