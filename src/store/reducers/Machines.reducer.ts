import {generateUUID} from '../../functions/generateUUID';
import {MachineActions} from '../actions/Machines.actions';
import {CategoryInterface, MachineAction} from '../types/Machines.types';

export const MachineReducer = (
  state: CategoryInterface[] = [],
  action: MachineAction,
): CategoryInterface[] => {
  switch (action.type) {
    case MachineActions.AddCategory:
      return state.concat([
        {
          id: generateUUID(),
          name: '',
          fields: [],
          machines: [],
        },
      ]);
    case MachineActions.EditCategory:
      return state.map(i => {
        if (i.id == action.payload.id) {
          const clone = {...i};
          clone.name = action.payload.name;
          return clone;
        }
        return i;
      });
    case MachineActions.DeleteCategory:
      return state.filter(i => i.id != action.payload.id);

    case MachineActions.AddCategoryField:
      return state.map(i => {
        if (i.id == action.payload.id) {
          const clone = {...i};
          clone.fields = [
            ...i.fields,
            {
              fieldId: generateUUID(),
              name: '',
              type: action.payload.type,
            },
          ];
          return clone;
        }
        return i;
      });
    case MachineActions.EditCategoryField:
      return state.map(i => {
        if (i.id == action.payload.id) {
          const clone = {...i};
          clone.fields = i.fields.map(v => {
            if (v.fieldId == action.payload.fieldId) {
              return {
                ...v,
                name: action.payload.name,
              };
            }
            return v;
          });
          return clone;
        }
        return i;
      });
    case MachineActions.DeleteCategoryField:
      return state.map(i => {
        if (i.id == action.payload.id) {
          const clone = {...i};
          clone.fields = i.fields.filter(
            v => v.fieldId != action.payload.fieldId,
          );
          return clone;
        }
        return i;
      });

    case MachineActions.AddMachine:
      return state.map(i => {
        if (i.id == action.payload.id) {
          const clone = {...i};
          clone.machines = [
            ...i.machines,
            {
              machineId: generateUUID(),
              name: '',
              data: [],
            },
          ];
          return clone;
        }
        return i;
      });
    case MachineActions.EditMachine:
      return state.map(i => {
        if (i.id == action.payload.id) {
          const clone = {...i};
          clone.machines = i.machines.map(v => {
            if (v.machineId == action.payload.machineId) {
              return {
                ...v,
                name: action.payload.name,
              };
            }
            return v;
          });
          return clone;
        }
        return i;
      });
    case MachineActions.DeleteMachine:
      return state.map(i => {
        if (i.id == action.payload.id) {
          const clone = {...i};
          clone.machines = i.machines.filter(
            v => v.machineId != action.payload.machineId,
          );
          return clone;
        }
        return i;
      });

    case MachineActions.EditMachineField:
      return state.map(i => {
        if (i.id == action.payload.id) {
          const clone = {...i};
          clone.machines = i.machines.map(v => {
            if (v.machineId == action.payload.machineId) {
              return {
                ...v,
                data: {
                  ...v.data,
                  [action.payload.basedOnFieldId]: action.payload.value,
                },
              };
            }
            return v;
          });
          return clone;
        }
        return i;
      });

    default:
      return state;
  }
};
