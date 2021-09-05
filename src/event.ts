/**
 * An event on the timeline.
 */
export default interface Event {
    name: string,
    cb: Function,
    delay: number,
    params: any
}