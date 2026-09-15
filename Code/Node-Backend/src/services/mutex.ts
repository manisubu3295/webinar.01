/**
 * A minimal in-process async mutex.
 *
 * Node is single-threaded, but that alone does NOT make "read next bill number,
 * then write the invoice" safe. As soon as the handler that creates an invoice
 * contains an `await` (which it will the moment this in-memory store is swapped
 * for a real database call), another request's handler can interleave between
 * those two steps on the same event loop and two invoices could be handed the
 * same bill number.
 *
 * runExclusive() serializes callbacks through a promise chain so only one
 * "critical section" (read counter -> assign -> persist) runs at a time,
 * regardless of how many awaits it contains. This is the same guarantee a
 * `synchronized` block or a DB row lock gives in other stacks, just implemented
 * with a promise queue instead of an OS-level primitive.
 */
export class Mutex {
  private tail: Promise<unknown> = Promise.resolve();

  runExclusive<T>(fn: () => Promise<T> | T): Promise<T> {
    const result = this.tail.then(() => fn());
    // Swallow errors in the chain itself (not in the caller's result) so one
    // failed request never permanently jams the queue for later requests.
    this.tail = result.catch(() => undefined);
    return result;
  }
}
