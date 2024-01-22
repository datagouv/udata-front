import { columnResizing } from '@milkdown/prose/tables';
import { $prose } from '@milkdown/utils';
import { DSFRTableView } from '../ProseMirror/DSFRTableView';

export const dsfrColumnResizingPlugin = $prose(() => columnResizing({View: DSFRTableView}));
