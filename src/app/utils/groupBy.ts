export type KeyGetter<ItemType> = (item: ItemType) => PropertyKey;
/**
 * @returns A dictionary where the keys are provided by the `key` function
 * and the values are the items which share the same value for that `key`
 */
export const groupBy = <ItemType extends object>(
  array: ItemType[],
  key: KeyGetter<ItemType>,
) =>
  array.reduce(
    (groupedBy, item) => {
      const groupingKey = key(item);
      const groupedItems = groupedBy[groupingKey] ?? [];
      return {
        ...groupedBy,
        [groupingKey]: [...groupedItems, item],
      };
    },
    {} as { [key in PropertyKey]: ItemType[] },
  );
