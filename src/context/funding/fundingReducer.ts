import type { FundingAction, FundingContextState } from "./fundingMachine";

export const initialFundingState: FundingContextState = {
  state: "idle",
  isLocked: false,
};

export function fundingReducer(
  state: FundingContextState,
  action: FundingAction,
): FundingContextState {
  switch (action.type) {
    case "START":
      if (state.isLocked) return state;

      return {
        ...state,
        state: "funding",
        isLocked: true,
        error: undefined,
      };

    case "SUCCESS":
      return {
        ...state,
        state: "success",
        isLocked: false,
      };

    case "ERROR":
      return {
        ...state,
        state: "error",
        error: action.error,
        isLocked: false,
      };

    case "RESET":
      return initialFundingState;

    default:
      return state;
  }
}
