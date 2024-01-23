export function excludeProperties(obj: any, props: string[]) {
  const newObj = { ...obj };
  props.forEach((prop) => {
    delete newObj[prop];
  });
  return newObj;
}

export function isNullOrUndefined(obj: any) {
  return obj === null || obj === undefined;
}


export function removeDuplicates(array: any) {
  const uniqueGlobalContactIds = new Set();
  return array.filter((item: any) => {
    if (!uniqueGlobalContactIds.has(item.GlobalContactId)) {
      uniqueGlobalContactIds.add(item.GlobalContactId);
      return true;
    }
    return false;
  });
}