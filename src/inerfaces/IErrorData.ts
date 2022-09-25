export default interface IErrorData {
    errorCode: number;
    errorMessage: string;
    displayMessage?: string;
    criticla: boolean;
    rowError: any;
}