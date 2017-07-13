export default ({className, required, formState, fieldState}) => {

  let validationState = null, help = null;

  if (fieldState.isMessageVisible() || !formState.showMessageOnBlur()) {
    if (fieldState.isValid()) {
      validationState = fieldState.get('warn') ? 'warning' : 'success';
    }
    if (fieldState.isValidating()) {validationState = 'warning';}
    if (fieldState.isInvalid()) {validationState = 'error';}

    help = fieldState.getMessage();
  }

  return {
    computedClassName: `${className || ''} ${required ? 'required' : ''}`,
    validationState,
    help
  };
};
