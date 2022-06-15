import React, { useState } from 'react';

import { ContentChanger } from './ContentChanger';

import newEntry from '../modules/newEntry';

import '../style/expenseItem.css';

type Props = {
    adaptExpenses: (newExpense: newEntry) => void;
    id: string;
    item: string;
    amount: string;
    date: string;
}

const ExpenseItem: React.FC<Props> = (props) => {

    const [modalShow, setModalShow] = useState<boolean>(false);

    // const [item, setItem] = useState(props.item);
    // const [date, setDate] = useState(props.date);
    // const [amount, setAmount] = useState(props.amount);

    // setItem(handleSubmit.item);
    // setDate(handleSubmit.date);
    // setAmount(handleSubmit.amount);

    // das Obige erfordert den Einsatz, das Importieren und das Exportieren von handleSubmit aus ContentChanger, es gibt aber zurzeit nur Fehler über zu viele Renderversuche ab

    const dateOpts: Intl.DateTimeFormatOptions = { year: "numeric", month: "2-digit", day: "2-digit" };

    const modalCloser = () => {
        setModalShow(false);
    };

    const newDataProcesser = (newExpenseEntries: newEntry) => {

        const newExpenseData = {
            ...newExpenseEntries,
        };

        console.log(newExpenseData);

        props.adaptExpenses(newExpenseData);

    }

    return (
        <React.Fragment>
            <div id={props.id} className="grid-container">
                <div className="date">
                    {new Date(props.date).toLocaleDateString('de-DE', dateOpts)}
                </div>

                <div className="payment">
                    <p className="paymentText">{props.item}</p>
                </div>
                <div className="amount">
                    <span>€{props.amount}</span>
                </div>
                <button /*variant="primary"*/ onClick={() => setModalShow(true)} className="changeButton">change entry</button>
                <ContentChanger
                    show={modalShow}
                    hide={modalCloser}
                    onSaveNewExpenseData={newDataProcesser}
                    elementId={props.id}
                />
            </div>
        </React.Fragment>
    );
}

/*

ContentChanger evtl. nach oben in App schieben, um dort direkt die Änderungen vorzunehmen. Dies ist wahrscheinlich, was die Änderung der Einträge angeht, ein unnötiger Zwischenhalt, der den Vorgang eher erschweren als begünstigen wird, aber vielleicht muss es nichtsdestotrotz wegen der Taste für das Zeigen des Modals hier bleiben ?

*/

export default ExpenseItem;

