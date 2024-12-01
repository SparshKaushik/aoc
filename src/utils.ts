import { cancel } from "@clack/prompts";

export function cancelHandler(isCancel: boolean) {
  if (!isCancel) return;

  cancel("Operation Cancelled");
  process.exit(0);
}
