export abstract class MetadataEntry<T> {
  readonly #contents: T[];

  constructor(contents: T[] = []) {
    this.#contents = contents;
  }

  get contents(): T[] {
    return this.#contents;
  }

  pop(): T {
    return this.#contents.pop()!;
  }

  add(contentItem: T): void {
    this.#contents.push(contentItem);
  }
}
