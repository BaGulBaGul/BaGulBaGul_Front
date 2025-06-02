export const closeFilter = (setOpen: any, func?: () => void) => {
  setOpen(false);
  if (!!func) { func(); }
}

export const handleObjectValue = (setData: any, key: string, value: any) => {
  setData((prev: any) => ({ ...prev, [key]: value }))
}