import type { MarkType, Node } from "prosemirror-model";

export function getMarkInNode(node: Node, markType: MarkType) {
  return node.marks.find(mark => mark.type === markType);
}
