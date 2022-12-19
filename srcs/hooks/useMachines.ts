import {useDispatch, useSelector} from 'react-redux';
import {MachineActions} from '../store/actions/Machines.actions';
import { MachineTypeInterface } from '../store/types/Machines.types';

export const useMachines = ():{dispatch:any,state:MachineTypeInterface[]} => {
  const dispatch = useDispatch();
  const MachineReducer = useSelector(s => s.MachineReducer);


  return {
    dispatch: (action: keyof typeof MachineActions) => {
        
     
        switch (action) {
          case MachineActions.AddMachineType:
            return () => dispatch({type: MachineActions.AddMachineType});
          case MachineActions.EditMachineType:
            return (payload: {name: string; id: string}) =>
              dispatch({type: MachineActions.EditMachineType, payload});
          case MachineActions.DeleteMachineType:
            return (payload: {id: string}) =>
              dispatch({type: MachineActions.DeleteMachineType, payload});
          case MachineActions.AddMachineTypeField:
            return (payload: {
              id: string;
              type: 'TEXT' | 'DATE' | 'BOOL' | 'NUMBER';
            }) => dispatch({type: MachineActions.AddMachineTypeField, payload});
          case MachineActions.EditMachineTypeField:
            return (payload: {id: string; fieldId: string; name: string}) =>
              dispatch({type: MachineActions.EditMachineTypeField, payload});
          case MachineActions.DeleteMachineTypeField:
            return (payload: {id: string; fieldId: string}) =>
              dispatch({type: MachineActions.DeleteMachineTypeField, payload});
    
          case MachineActions.AddMachine:
            return (payload: {id: string}) =>
              dispatch({type: MachineActions.AddMachineType, payload});
          case MachineActions.EditMachine:
            return (payload: {id: string; machineId: string; name: string}) =>
              dispatch({type: MachineActions.EditMachineType, payload});
          case MachineActions.DeleteMachine:
            return (payload: {id: string; machineId: string}) =>
              dispatch({type: MachineActions.EditMachineType, payload});
    
          case MachineActions.EditMachineField:
            return (payload: {
              id: string;
              machineId: string;
              basedOnFieldId: string;
              value: string | Date | boolean;
            }) => dispatch({type: MachineActions.EditMachineType, payload});
        }
      },
      state:MachineReducer
  };
};
