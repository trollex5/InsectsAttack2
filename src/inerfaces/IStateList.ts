
export interface IStateConfig {
    entryPoint: string;
    states: IStateList[];
}

export interface IStateList {
    name: string;
    links: IStateLinks[];
}

export interface IStateLinks {
    condition: string;
    nextState: string;
}