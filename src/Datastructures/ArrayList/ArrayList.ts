/**
 * ArrayList implementation in typescript
 */
class ArrayList<T> {
  private list: T[];

  private index: number;

  constructor(size: number) {
    this.list = Array<T>(size);
    this.index = 0;
  }

  // Time complexity O(1)
  private isFull(): boolean {
    return this.index + 1 === this.list.length;
  }

  // Time complexity O(n)
  // Space complexity O(n)
  private grow(): T[] {
    // reserve three times as much space for the next list, so we don't need to do this operation too often
    const list = new Array<T>(this.size() * 3);

    for (let i = 0; i < this.size(); i++) {
      list[i] = this.list[i];
    }

    return list;
  }

  // Time complexity O(1), worst case O(n)
  push(value: T): void {
    if (this.isFull()) {
      this.list = this.grow();
    }

    this.list[this.index] = value;
    this.index++;
  }

  // Time complexity O(n)
  // Space complexity O(n)
  slice(start?: number, end?: number): ArrayList<T> {
    const sliced = this.getAsArray().slice(start, end);

    const list = new ArrayList<T>(sliced.length);

    for (let i = 0; i < sliced.length; i++) {
      list.push(sliced[i]);
    }

    return list;
  }

  // remove item from the beginning of the queue and return that value
  // Time complexity O(n)
  shift(): T | undefined {
    this.index--;
    return this.list.shift();
  }

  // Time complexity O(n)
  // Space complexity O(n)
  map<K>(fn: (value: T) => K): ArrayList<K> {
    const list = this.getAsArray();
    const newList = new ArrayList<K>(this.size());

    for (let i = 0; i < list.length; i++) {
      newList.push(fn(list[i]));
    }

    return newList;
  }

  // Time complexity O(n)
  // Space complexity O(n)
  filter(fn: (value: T) => boolean): ArrayList<T> {
    const list = this.getAsArray();
    const newList = new ArrayList<T>(1);

    for (let i = 0; i < list.length; i++) {
      if (fn(list[i])) {
        newList.push(list[i]);
      }
    }

    return newList;
  }

  // Time complexity O(n)
  // Space complexity O(n)
  find<K>(fn: (value: T) => K): T | undefined {
    const list = this.getAsArray();

    for (let i = 0; i < list.length; i++) {
      if (fn(list[i])) {
        return list[i];
      }
    }

    return undefined;
  }

  // TODO: implement proper sort algorithm
  sort(fn: (a: T, b: T) => number): ArrayList<T> {
    const sorted = [...this.list].sort(fn);

    const list = new ArrayList<T>(this.size());
    for (let i = 0; i < this.size(); i++) {
      list.push(sorted[i]);
    }

    return list;
  }

  // Time complexity O(1)
  size(): number {
    return this.index;
  }

  // Time complexity O(1)
  at(index: number): T {
    return this.list[index];
  }

  /**
   * Return all values from the list, except undefined values
   * This will cause issue if given type would be undefined, but in this project undefined lists will never be used
   * Undefined is removed because the grow method will reserve extra space
   * Time complexity O(n)
   * Space complexity O(n)
   */
  getAsArray(): T[] {
    const list: T[] = [];
    for (let i = 0; i < this.list.length; i++) {
      if (this.list[i] !== undefined) {
        list.push(this.list[i]);
      }
    }

    return list;
  }
}

export default ArrayList;
