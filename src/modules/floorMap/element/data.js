/* @flow */

export const getCellsByRow = (plan): Array<Row> => {
    const cellsByRow: Array<Row> = [];

    for (var rowIndex = 0; rowIndex < plan.length; rowIndex++) {
        let row: Row = {
            id: `row-${rowIndex}`,
            cells: []
        };

        for (var columnIndex = 0; columnIndex < plan[0].length; columnIndex++) {
            row.cells.push({
                id: `cell-${rowIndex}-${columnIndex}`,
                type: plan[rowIndex][columnIndex],
            });
        }

        cellsByRow.push(row)
    }

    return cellsByRow;
};

export type Cell = {
    id: string;
    title: string;
};

export type Row = {
    id: string;
    cells: Array<Cell>;
};
