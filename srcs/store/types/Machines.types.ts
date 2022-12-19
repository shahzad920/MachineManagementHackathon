import { MachineActions } from "../actions/Machines.actions";

export interface CategoryFieldInterface {
    fieldId: string;
    name:string;
    type: "TEXT" | "DATE" | "BOOL" | "NUMBER"
}
export interface MachineInterface {
    machineId: string;
    name: string;
    data:{
       [key:string]: string| Date | boolean
    }[]
}
export interface CategoryInterface {
    id: string;
    name: string;
    fields: CategoryFieldInterface[];
    machines: MachineInterface[]
}

export interface MachineAction {
    type : keyof typeof MachineActions,
    payload:any
}