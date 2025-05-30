export const closeFilter = (setOpen: any, routeToFilter?: any) => {
  setOpen(false);
  if (!!routeToFilter) { routeToFilter(); }
}

export const handleFilterValue = (setP: any, key: string, value: any) => {
  setP((prev: any) => ({ ...prev, [key]: value }))
}