import { columnResizing } from '@milkdown/prose/tables';
import { $prose } from '@milkdown/utils';
import { TableView } from '../ProseMirror/DSFRTableView';

export const dsfrColumnResizingPlugin = $prose(() => columnResizing({View: TableView}));
