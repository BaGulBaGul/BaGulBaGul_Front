export const closeFilter = (setOpen: any, func?: () => void) => {
  setOpen(false);
  if (!!func) { func(); }
}

export const handleFilterValue = (setP: any, key: string, value: any) => {
  setP((prev: any) => ({ ...prev, [key]: value }))
}