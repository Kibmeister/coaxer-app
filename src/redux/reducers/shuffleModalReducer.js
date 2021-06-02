import produce from 'immer';

export const SHUFFLE_MODAL = 'SHUFFLE_MODAL';
export const RESET_MODAL = 'RESET_MODAL';

//ACTIONS
//action determines what modal is visible during task creation
export const shuffleModals = (modalName) => ({
  type: SHUFFLE_MODAL,
  payload: modalName,
});
// action for resetting all the tasks to initial state
export const resetModal = () => ({
  type: RESET_MODAL,
  payload: '',
});

// one of the sub-states to store, governs the state of the modal views
const initialState = {
  activeModals: {
    description: { active: true },
    category: { active: false },
    iterations: { active: false },
    duedate: { active: false },
    confirmation: { active: false },
  },
};
//REDUCER - manipulates state to what modal that should be active
const shuffleModalReducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case SHUFFLE_MODAL:
        if (action.payload == 'Description') {
          draft.activeModals.description.active = false;
          draft.activeModals.category.active = true;
          draft.activeModals.iterations.active = false;
          draft.activeModals.duedate.active = false;
        } 
         else if (action.payload == 'Category') {
          draft.activeModals.description.active = false;
          draft.activeModals.category.active = false;
          draft.activeModals.iterations.active = true;
          draft.activeModals.duedate.active = false;
        } else if (action.payload == 'Iterations') {
          draft.activeModals.description.active = false;
          draft.activeModals.category.active = false;
          draft.activeModals.iterations.active = false;
          draft.activeModals.duedate.active = true;
        } else if (action.payload == 'DueDate') {
          draft.activeModals.description.active = false;
          draft.activeModals.category.active = false;
          draft.activeModals.iterations.active = false;
          draft.activeModals.duedate.active = false;
          draft.activeModals.confirmation.active = true;
        }
        break;

      case RESET_MODAL:
       
        draft.activeModals.description.active = true;
        draft.activeModals.category.active = false;
        draft.activeModals.iterations.active = false;
        draft.activeModals.duedate.active = false;
        draft.activeModals.confirmation.active = false;
        break;
      default:
    }
  });
};
export default shuffleModalReducer;
