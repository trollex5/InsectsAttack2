import IErrorData from "../inerfaces/IErrorData";
import { BaseModel } from "./BaseModel";



class ErrorModel extends BaseModel<IErrorData> {
    
    public errorCode: number;
    public errorMesage: string;
    public displayMesage: string;
    public critical: boolean;
    public rawError: any;

    constructor() {
        super();

        this.errorCode = -1;
        this.errorMesage = "";
        this.displayMesage = "";
        this.critical = false;
    }

    public cleanUp() {
        this.errorMesage = "";
        this.displayMesage = "";
        this.errorCode = -1;
        this.critical = false;
    }

    public hasError(): boolean {
        return this.errorCode >= 0;
    }

    public update(data?: any) {
        super.update(data);
        try {
            this.errorCode = data.data.error == 0 ? -1 : data.data.error;
        } catch (error) {
            console.log("ERROR: ", error);
        }
    }
}

export default new ErrorModel();