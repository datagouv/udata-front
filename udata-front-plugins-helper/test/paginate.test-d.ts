import { expectTypeOf, test } from 'vitest';
import getVisiblePages from "../src/paginate";

test('getVisiblePages types', () => {
    expectTypeOf(getVisiblePages).toBeFunction();
    expectTypeOf(getVisiblePages).parameter(0).toBeNumber();
    expectTypeOf(getVisiblePages).parameter(1).toBeNumber();
    expectTypeOf(getVisiblePages).returns.toMatchTypeOf<Array<number | null>>();
});
