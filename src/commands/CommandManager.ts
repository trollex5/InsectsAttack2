
class CommandManager {
    static commandsList: Map<string, (...args: any[]) => void>;

    constructor() {
        CommandManager.commandsList = new Map<string, (...args: any[]) => void>();
    }

    public has(commanName: string): boolean {
        return CommandManager.commandsList.has(commanName);
    }

    public setCommand(commandName: string, command: (...args: any[]) => void) {
        CommandManager.commandsList.set(commandName, command);
    }

    public execute(commandName: string, args?: any) {
        if(CommandManager.commandsList.has(commandName)) {
            CommandManager.commandsList.get(commandName)(args);
        } else {
            console.log("Comman " + commandName + " not found!");
            
        }
    }
}

export default new CommandManager();