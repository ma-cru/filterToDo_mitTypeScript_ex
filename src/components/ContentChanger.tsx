import React, { FormEvent, useState } from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import InputForm from './InputForm';

// import dateConvertor from './dateConvertor';

import newEntry from '../modules/newEntry';

import '../style/contentChanger.css';

type Props = {
  show: boolean;
  hide: () => void;
  onSaveNewExpenseData: (newExpenseEntries: newEntry) => void;
  elementId: string;
}

const ContentChanger: React.FC<Props> = (props) => {

  const [enteredItem, setItem] = useState<string>('');
  const [enteredDate, setDate] = useState<string>('');
  const [enteredAmount, setAmount] = useState<string>('');

  const dateChangeHandler = (event: React.ChangeEvent) => {
    setDate((event.target as HTMLInputElement).value);
  };
  const amountChangeHandler = (event: React.ChangeEvent) => {
    setAmount((event.target as HTMLInputElement).value);
  };
  const itemChangeHandler = (event: React.ChangeEvent) => {
    setItem((event.target as HTMLInputElement).value);
  };

  const handleSubmit = (e: FormEvent) => { // musst hier die Funktionalität anpassen, sodass du die ID des ausgewählten Elements mitlieferst. Evtl. sollen auch die Funktionen in App.tsx, worauf zugegriffen wird, verändert werden

    e.preventDefault()

    console.log(props.elementId);

    const adaptedExpenseEntry = {
      key: props.elementId,
      id: props.elementId,
      item: enteredItem,
      amount: enteredAmount,
      date: enteredDate/*.split("-").reverse().join(".")*/
    }

    console.log(adaptedExpenseEntry);

    props.onSaveNewExpenseData(adaptedExpenseEntry);

    setItem('');
    setAmount('');
    setDate('');

    props.hide();

  }

  return (
    <React.Fragment>
      <Modal
        show={props.show}
        aria-labelledby="contained-modal-title"
      >
        <Modal.Header closeButton onClick={props.hide}>
          <Modal.Title className="modalTitle" id="contained-modal-title">
            Change Entry
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="general">
          <InputForm
            handleSubmit={handleSubmit}
            itemChangeHandler={itemChangeHandler}
            amountChangeHandler={amountChangeHandler}
            dateChangeHandler={dateChangeHandler}
            enteredAmount={enteredAmount}
            enteredItem={enteredItem}
            enteredDate={enteredDate}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.hide}>Close</Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
}

export { ContentChanger };