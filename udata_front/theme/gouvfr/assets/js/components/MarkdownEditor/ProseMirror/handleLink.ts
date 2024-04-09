import type { Mark } from "prosemirror-model";
import { EditorView } from "prosemirror-view";

export function addLink(view: EditorView, mark: Mark, previousMark?: Mark | null) {
  const tr = view.state.tr;
  if (previousMark) {
    tr.removeMark(view.state.selection.from, view.state.selection.to, previousMark);
  }

  tr.addMark(view.state.selection.from, view.state.selection.to, mark);
  view.dispatch(tr);
}

export function removeLink(view: EditorView, from: number, to: number, mark: Mark) {
  const tr = view.state.tr;
  if (mark) {
    tr.removeMark(from, to, mark);
  }
  view.dispatch(tr);
}
