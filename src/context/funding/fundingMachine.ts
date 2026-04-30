export type FundingState = "idle" | "funding" | "success" | "error";

export type FundingAction =
  | { type: "START" }
  | { type: "SUCCESS" }
  | { type: "ERROR"; error: string }
  | { type: "RESET" };

export interface FundingContextState {
  state: FundingState;
  error?: string;
  txHash?: string;
  isLocked: boolean;
}
