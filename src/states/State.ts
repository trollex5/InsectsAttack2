import App from "../App";
import GameEvents from "../events/GameEvents";
import { StateMachine } from "./StateMachine";


export abstract class State {

    public name: string;
    protected exitLinkId: number
    protected links: ILink[];
    protected exitLink: ILink;
    protected stateMachine: StateMachine;
    protected chainSkipping: boolean;
    protected timer: number;


    constructor(stateMachine: StateMachine) {
        this.stateMachine = stateMachine;
        this.chainSkipping = false;
    }

    public enter(): void {
        this.timer = new Date().getTime();

        this.stateMachine.currentState = this;
    }

    public canExit(): boolean {
        return false;
    }

    public skip() {
        this.exit();
    }

    private canChainExit(): boolean {
        if(this.canExit()) {
            this.exitLinkId = 0;
            let link = this.getNextLink();
            while (link && !link.condition.check()) {
                link = this.getNextLink();
            }
            return link.next.canExit();
        }

        return false;
    }

    public setChainSkipping() {
        this.chainSkipping = this.canChainExit();
    }

    public chainSkip() {
        this.setChainSkipping();

        if(this.canExit()) {
            this.skip();
        }
    }

    public exit(): void {
        this.exitLinkId = 0;
        let link = this.getNextLink();
        
        while(link && !link.condition.check()) {
            link = this.getNextLink();
        }
        if(!link) {
            throw new Error("Missing valid state link");
        }

        this.exitLink = link;

        this.onComplete();
    }

    protected onComplete (): void {
        if(this.stateMachine.currentState === this) {
            console.log(
                "[State] EXIT state: " +
                this.name +
                " [" +
                (new Date().getTime() - this.timer) / 1000 +
                " sec]"
            );
            console.log("[State] ENTER state: " + this.exitLink.next.name);
            
            App.dispatcher.emit(GameEvents.STATE_CHANGED, this,this.exitLink.next.name, this.name);

            console.log("[State] chain skipping " + this.chainSkipping);

            const chaining = this.chainSkipping;
            this.chainSkipping = false;

            if(chaining) {
                this.exitLink.next.setChainSkipping();
            }

            this.exitLink.next.enter();

            if(chaining) {
                this.exitLink.next.chainSkip();
            } 
        } else {
            this.chainSkipping = false;
        }
    }

    public error(): void {
        throw new Error("Error!!!");
    }

    public addLink(link: ILink): void {
        if(!this.links) {
            this.links = [];
        }

        this.links.push(link);
    }

    public getNextLink(): ILink {
        const link = this.links[this.exitLinkId];
        this.exitLinkId++;

        return link;
    }
    
}

export interface ILink {
    condition: ICondition;
    next: State;
}

export interface ICondition {
    check: () => boolean;
}

export interface IStatesConfigSchema {
    entryPoint: string;
    states: IStateConfig[];
    condition: IConnectionConfig[];
}

export interface IStateConfig {
    name: string;
    links: ILinkConfig[];
}

interface ILinkConfig {
    condition: string;
    nextState: string;
}

interface IConnectionConfig {
    name: string;
}