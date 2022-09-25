import { State } from "./State";


export default class AuthorizationState extends State {
    

    public enter(): void {
        super.enter();

        // TODO if some data is needed
        // sendUrlRequest
        // sendGameDataRequest
        this.sendSessionRequest();
    }

    protected sendSessionRequest() {
        console.log("=====sendSessionRequest=====");
        
        this.exit();
    }
}