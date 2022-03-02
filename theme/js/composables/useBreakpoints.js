/**
 *
 * @typedef BreakpointModel
 * @property {string} id
 * @property {Number} minWidth
 */

/**
 *
 * @typedef BreakpointsModel
 * @property {BreakpointModel} XS
 * @property {BreakpointModel} SM
 * @property {BreakpointModel} MD
 * @property {BreakpointModel} LG
 * @property {BreakpointModel} XL
 */
const Breakpoints = window.dsfr.core.Breakpoints;
/**
 * @function isBreakpoint
 * @param {BreakpointModel | string} breakpoint
 * @returns boolean
 */
const isBreakpoint = window.dsfr.core.Instance.prototype.isBreakpoint;
export default function useBreakpoints() {
  return {
    /**
     * @type BreakpointsModel
     */
    Breakpoints,
    isBreakpoint,
  }
}
