import produce from 'immer';

export const BOTTOM_BAR_ACTIVE = 'BOTTOM_BAR_ACTIVE';

//ACTIONES, object that holds the name for button to the bottomanv bar pressed 
export const bottomBarActive = (taksname) => ({
  type: BOTTOM_BAR_ACTIVE,
  payload: taksname,
});

// one of the sub-states to store
const initialState = {
  activeButtons: {
    tasksButton: { active: true },
    profileButton: { active: false },
  },
};
//REDUCER - manipulates state to what screen that should be active
const bottomBarReducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case BOTTOM_BAR_ACTIVE:
        if (action.payload == 'Tasks') {
          draft.activeButtons.tasksButton.active = true;
          draft.activeButtons.profileButton.active = false;

       }
       else if (action.payload == 'Profile') {
        draft.activeButtons.tasksButton.active = false;
        draft.activeButtons.profileButton.active = true;        
      };

      default:
    }
  });
}

export default bottomBarReducer;
