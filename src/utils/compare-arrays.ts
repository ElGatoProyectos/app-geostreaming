export function compareArrays({
  oldArray,
  newArray,
}: {
  oldArray: any[];
  newArray?: any[] | null;
}) {
  const newItems = [] as any[];
  const persistedItems = [] as any[];
  const removedItems = [] as any[];

  const oldIds = new Set(oldArray.map((item) => item.id));

  newArray?.forEach((item) => {
    if (item.id === undefined) {
      newItems.push(item);
    } else if (oldIds.has(item.id)) {
      persistedItems.push(item);
      oldIds.delete(item.id);
    }
  });

  oldArray.forEach((item) => {
    if (oldIds.has(item.id)) {
      removedItems.push(item);
    }
  });

  return {
    newItems,
    persistedItems,
    removedItems,
  };
}
