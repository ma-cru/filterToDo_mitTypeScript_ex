export type expensesStr = {
    id: string,
    key: string,
    item: string,
    amount: string,
    date: string,
}

const expenses: expensesStr[] = [
    {
        id: 'e1',
        key: 'e1',
        item: 'Toilet Paper',
        amount: '94.12',
        date: randomDate(new Date(2020, 0, 1), new Date()),
    },
    {
        id: 'e2',
        key: 'e2',
        item: 'New TV',
        amount: '799.49',
        date: randomDate(new Date(2020, 0, 1), new Date())
    },
    {
        id: 'e3',
        key: 'e3',
        item: 'Car Insurance',
        amount: '294.67',
        date: randomDate(new Date(2020, 0, 1), new Date()),
    },
    {
        id: 'e4',
        key: 'e4',
        item: 'New Desk (Wooden)',
        amount: '450',
        date: createRandomDate(new Date(2020, 0, 1), new Date()),
    },
];

function createRandomDate(start: Date, end: Date) {

    let newDateFull: Date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

    // let dateStr: string = newDateFull.toLocaleString();

    let dateStr: string = newDateFull.toISOString();

    let tIndex: number = dateStr.indexOf('T');

    return dateStr.slice(0, tIndex);
}

export default expenses