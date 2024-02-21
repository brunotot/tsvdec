import { Objects, Types } from "..";

/**
 * A generic caching utility class used by `ValidationEngine`.
 * @typeParam CacheValue - The type of the cache object.
 * @typeParam Payload - The type of the payload object.
 * @remarks This class provides methods to get and patch cached values based on a payload.
 */
export class Cache<TCache extends Types.Object, TPayload extends Types.Object> {
  #metadata: Types.Object;
  #cache: TCache;
  #payload: TPayload;
  #refresh: (payload: TPayload, metadata: Types.Object) => TCache;

  /**
   * Constructs a new `Cache` instance.
   * @param refresh - Callback which evaluates new cache value based on the given payload.
   */
  constructor(refresh: (payload: TPayload, metadata: Types.Object) => TCache) {
    this.#metadata = {};
    this.#cache = {} as TCache;
    this.#payload = {} as TPayload;
    this.#refresh = refresh;
  }

  /**
   * Sets a value in the cache for the specified cache key.
   * @typeParam CacheKey - The type of the cache key.
   * @param {CacheKey} cacheKey - The cache key.
   * @param {TCache[CacheKey]} value - The value to set in the cache.
   */
  set<CacheKey extends keyof TCache>(cacheKey: CacheKey, value: TCache[CacheKey]): void {
    this.#cache[cacheKey] = value;
  }

  /**
   * Retrieves a value from the cache.
   * @typeParam CacheKey - The key type of the cache value.
   * @param key - The key to retrieve the value for.
   * @param payload - An optional payload to use for cache retrieval.
   * @returns The cached value for the given key.
   */
  get<CacheKey extends keyof TCache>(
    key: CacheKey,
    payload?: TPayload,
    metadata?: Types.Object,
  ): TCache[CacheKey] {
    const isPayloadUndefined = payload !== undefined;
    if (isPayloadUndefined) return this.#refreshAndGet(key, payload, metadata);
    return this.#cache[key];
  }

  /**
   * Patches the cache with new values.
   * @param partialCache - An object containing the new cache values.
   * @param payload - The payload to use for this patch operation.
   * @param metadata - Metadata.
   * @returns The updated cache object.
   */
  patch(partialCache: Partial<TCache>, payload?: TPayload, metadata?: Types.Object): TCache {
    this.#payload = payload ?? this.#payload;
    this.#metadata = metadata ?? this.#metadata;
    const entries = Object.entries(partialCache);
    entries.forEach(([key, value]) => this.set(key, value));
    return this.#cache;
  }

  /**
   * Internal method to retrieve a value from the cache based on a payload.
   * @typeParam CacheKey - The key type of the cache value.
   * @param payload - The payload to use for cache retrieval.
   * @param key - The key to retrieve the value for.
   * @returns The cached value for the given key.
   */
  #refreshAndGet<CacheKey extends keyof TCache>(
    key: CacheKey,
    payload: TPayload,
    metadata: Types.Object = {},
  ): TCache[CacheKey] {
    const value: TCache[CacheKey] = this.#cache[key];
    const useCache = value !== undefined && Objects.deepEquals(this.#payload, payload);
    if (useCache) return value;
    return this.#refresh(payload, metadata)[key];
  }
}
