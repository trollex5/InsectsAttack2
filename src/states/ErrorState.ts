import { State } from "./State";


export default class ErrorState extends State {

    public enter(): void {
        console.log("We has error!");
        debugger;
        
    }
}