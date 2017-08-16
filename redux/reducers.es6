

export const forms = (state = [], action) => {
  switch (action.type) {
    case 'CREATE_FORM':
      return [...state, form({}, action)];
    case 'UPDATE_FORM':
      return state.map(f => form(f, action));
    case 'DELETE_FORM':
      return state.filter(f => f.id !== action.id);
    default:
      return state;
  }
};


const form = (state = {}, action) => {
  switch (action.type) {
    case 'CREATE_FORM':
      return {
        id: action.id,
        state: {}
      };
    case 'UPDATE_FORM':
      return (state.id !== action.id) ?
        state :
        {...state, state: {...state.state, ...action.updates}};
    default:
      return state;
  }
};
