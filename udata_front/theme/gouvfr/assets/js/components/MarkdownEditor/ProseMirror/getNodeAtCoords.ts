import { EditorView } from "prosemirror-view";

export function getNodeAtCoords(coords: {left: number, top: number}, view: EditorView) {
  const $pos = view.posAtCoords(coords);
  if (!$pos)
    return {
      node: null,
      pos: null,
    };

  const { pos } = $pos;
  return {
    node: view.state.doc.nodeAt(pos),
    pos,
  };
}
