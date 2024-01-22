import type { Node } from 'prosemirror-model';
import { TableView } from "prosemirror-tables";

/**
 * This extended class is necessary to customize the `className` of the table wrapper
 * It's set to `.tableWrapper` in the Prose Mirror but we want it to be the DSFR class
 */
export class DSFRTableView extends TableView {
  constructor(node: Node, cellMinWidth: number) {
  	super(node, cellMinWidth);
  	this.dom.className = 'fr-table';
  }
}
