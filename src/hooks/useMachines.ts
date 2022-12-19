import {useDispatch, useSelector} from 'react-redux';
import {MachineActions} from '../store/actions/Machines.actions';
import {CategoryInterface} from '../store/types/Machines.types';

export const useMachines = () => {
  const dispatch = useDispatch();
  //@ts-ignore
  const MachineReducer = useSelector(
    ({MachineReducer}: {MachineReducer: CategoryInterface[]}) => MachineReducer,
  );

  return {
    actions: {
      AddCategory: () => {
        dispatch({type: MachineActions.AddCategory});
      },
      EditCategory: (payload: {name: string; id: string}) =>
        dispatch({type: MachineActions.EditCategory, payload}),
      DeleteCategory: (payload: {id: string}) =>
        dispatch({type: MachineActions.DeleteCategory, payload}),
      AddCategoryField: (payload: {
        id: string;
        type: 'TEXT' | 'DATE' | 'BOOL' | 'NUMBER';
      }) => dispatch({type: MachineActions.AddCategoryField, payload}),
      EditCategoryField: (payload: {
        id: string;
        fieldId: string;
        name: string;
      }) => dispatch({type: MachineActions.EditCategoryField, payload}),
      DeleteCategoryField: (payload: {id: string; fieldId: string}) =>
        dispatch({type: MachineActions.DeleteCategoryField, payload}),

      AddMachine: (payload: {id: string}) =>
        dispatch({type: MachineActions.AddMachine, payload}),
      EditMachine: (payload: {id: string; machineId: string; name: string}) =>
        dispatch({type: MachineActions.EditMachine, payload}),
      DeleteMachine: (payload: {id: string; machineId: string}) =>
        dispatch({type: MachineActions.DeleteMachine, payload}),

      EditMachineField: (payload: {
        id: string;
        machineId: string;
        basedOnFieldId: string;
        value: string | Date | boolean;
      }) => dispatch({type: MachineActions.EditMachineField, payload}),
    },
    state: MachineReducer,
  };
};
