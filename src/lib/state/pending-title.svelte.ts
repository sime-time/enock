let pendingTitle = $state<string | undefined>(undefined);

export function getPendingTitle() {
  return pendingTitle;
}

export function setPendingTitle(title: string) {
  pendingTitle = title;
}

export function clearPendingTitle() {
  pendingTitle = undefined;
}
