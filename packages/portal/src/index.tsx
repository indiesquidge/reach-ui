/**
 * Welcome to @reach/portal!
 *
 * Creates and appends a DOM node to the end of `document.body` and renders a
 * React tree into it. Useful for rendering a natural React element hierarchy
 * with a different DOM hierarchy to prevent parent styles from clipping or
 * hiding content (for popovers, dropdowns, and modals).
 *
 * @see Docs   https://reach.tech/portal
 * @see Source https://github.com/reach/reach-ui/tree/main/packages/portal
 * @see React  https://reactjs.org/docs/portals.html
 */

import * as React from "react";
import { useIsomorphicLayoutEffect as useLayoutEffect } from "@reach/utils/use-isomorphic-layout-effect";
import { useForceUpdate } from "@reach/utils/use-force-update";
import { createPortal } from "react-dom";

/**
 * Portal
 *
 * @see Docs https://reach.tech/portal#portal
 */
const Portal: React.FC<PortalProps> = ({ children, type = "reach-portal" }) => {
  let mountNode = React.useRef<HTMLDivElement | null>(null);
  let portalNode = React.useRef<HTMLElement | null>(null);
  let forceUpdate = useForceUpdate();

  useLayoutEffect(() => {
    // This ref may be null when a hot-loader replaces components on the page
    if (!mountNode.current) return;
    // It's possible that the content of the portal has, itself, been portaled.
    // In that case, it's important to append to the correct document element.
    const ownerDocument = mountNode.current!.ownerDocument;
    portalNode.current = ownerDocument?.createElement(type)!;
    ownerDocument!.body.appendChild(portalNode.current);
    forceUpdate();
    return () => {
      if (portalNode.current && portalNode.current.ownerDocument) {
        portalNode.current.ownerDocument.body.removeChild(portalNode.current);
      }
    };
  }, [type, forceUpdate]);

  return portalNode.current ? (
    createPortal(children, portalNode.current)
  ) : (
    <span ref={mountNode} />
  );
};

/**
 * @see Docs https://reach.tech/portal#portal-props
 */
type PortalProps = {
  /**
   * Regular React children.
   *
   * @see Docs https://reach.tech/portal#portal-children
   */
  children: React.ReactNode;
  /**
   * The DOM element type to render.
   *
   * @see Docs https://reach.tech/portal#portal-type
   */
  type?: string;
};

if (__DEV__) {
  Portal.displayName = "Portal";
}

////////////////////////////////////////////////////////////////////////////////
// Exports

export default Portal;
export type { PortalProps };
export { Portal };
