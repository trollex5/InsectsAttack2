import { State, ICondition, IStateConfig, IStatesConfigSchema } from "./State";
import GameConfig from "../configs/GameConfig";

export class StateMachine {

    public currentState: State;
    public states: Map<string, State>;
    public conditions: Map<string, ICondition>;

    public registerState(stateId: string, state: State) {
        if(!this.states) {
            this.states = new Map<string, State>();
        }
        this.states.set(stateId, state);
    }

    public get state(): string {
        return this.currentState.name;
    }

    public registerCondition(conditionId: string, Condition: ICondition) {
        if(!this.conditions) {
            this.conditions = new Map<string, ICondition>();
        }

        this.conditions.set(conditionId, Condition);
    }

    public startStateMachine(statesConfig: IStatesConfigSchema) {
        this.currentState = this.states.get(statesConfig.entryPoint);
        this.parseStateConfig(statesConfig);
        this.currentState.enter();
    }

    protected parseStateConfig(statesConfig: IStatesConfigSchema) {
        for(let i = 0; i < statesConfig.states.length; i++) {
            this.parseState(statesConfig.states[i]);
        }
    }

    protected parseState(stateConfig: IStateConfig) {
        const state = this.getState(stateConfig.name);
        state.name = stateConfig.name;
        for(let i = 0; i < stateConfig.links.length; i++) {
            state.addLink({
                condition: this.getCondition(stateConfig.links[i].condition),
                next: this.getState(stateConfig.links[i].nextState)
            });
        }
    }

    public getCondition(conditionId: string): ICondition {
        try {
            this.conditions.get(conditionId);
        } catch (e) {
            throw new Error(("Missing condition:" + conditionId));
        }

        return this.conditions.get(conditionId);
    }

    public getState(stateId: string): State {
        try {
            this.states.get(stateId);
        } catch (e) {
            throw new Error(("Missing State:" + stateId));
        }

        return this.states.get(stateId);
    }

    public skip() {
        console.log("[STATE]: skipping started");
        if(GameConfig.bulkSkip) {
            this.currentState.chainSkip();
        } else if(this.readyForNextState()) {
            this.currentState.skip();
        }
    }

    protected readyForNextState() {
        return this.currentState.canExit();
    }

} export default new StateMachine();