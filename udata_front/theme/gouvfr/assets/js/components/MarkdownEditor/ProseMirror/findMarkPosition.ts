import type { Mark, Node } from "prosemirror-model";

export function findMarkPosition(mark: Mark, doc: Node, from: number, to: number) {
  let markPos = { start: -1, end: -1 };
  doc.nodesBetween(from, to, (node, pos) => {
    // stop recursive finding if result is found
    if (markPos.start > -1)
      return false;

    if (markPos.start === -1 && mark.isInSet(node.marks)) {
      markPos = {
        start: pos,
        end: pos + Math.max(node.textContent.length, 1),
      };
    }

    return undefined;
  });

  return markPos;
}
