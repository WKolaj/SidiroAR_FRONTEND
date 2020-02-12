import { enqueueSnackbar } from "./snackbar";
import {
  showBusyDialogActionCreator,
  hideBusyDialogActionCreator
} from "./busyDialog";

export function wrapAsyncActionToHandleError(
  asyncAction,
  errorMessageInCaseOfError = null
) {
  return async function(dispatch, getState) {
    try {
      await dispatch(showBusyDialogActionCreator());
      await asyncAction(dispatch, getState);
    } catch (err) {
      console.log(err);

      let errorMessage = errorMessageInCaseOfError
        ? errorMessageInCaseOfError
        : err.message;

      await dispatch(
        enqueueSnackbar({
          message: errorMessage,
          options: { variant: "error" }
        })
      );
    } finally {
      await dispatch(hideBusyDialogActionCreator());
    }
  };
}
