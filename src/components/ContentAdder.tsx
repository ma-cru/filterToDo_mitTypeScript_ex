/*

ContentAdder und ContentChanger tun mehr oder wenig dasselbe. Solltest die zu einer Custom-Komponente machen, um Wiederholungen zu vermeiden. Einziger Unterschied ist, dass ContentChanger dann auf bestehende Elemente wird zugreifen müssen.

*/

import React, { ChangeEvent, FormEvent, useState } from 'react';

import { v4 as uuidv4 } from 'uuid';

import InputForm from './InputForm';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

// import dateConvertor from './dateConvertor';

import newEntry from '../modules/newEntry';

import '../style/contentChanger.css';

type Props = {
  show: boolean;
  hideadd: () => void;
  savenewentry: (newEntry: newEntry) => void;
}

const ContentAdder: React.FC<Props> = (props) => {

  const [enteredItem, setItem] = useState<string>('');
  const [enteredDate, setDate] = useState<string>('');
  const [enteredAmount, setAmount] = useState<string>('');

  const dateChangeHandler = (e: ChangeEvent) => {

    console.log((e.target as HTMLInputElement).value);

    setDate((e.target as HTMLInputElement).value);
  };
  const amountChangeHandler = (e: ChangeEvent) => {
    setAmount((e.target as HTMLInputElement).value);
  };
  const itemChangeHandler = (e: ChangeEvent) => {
    setItem((e.target as HTMLInputElement).value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const elementId = (uuidv4());

    const newEntryData = {
      id: elementId,
      key: elementId,
      item: enteredItem,
      amount: enteredAmount,
      date: enteredDate
    }

    console.log(newEntryData);

    props.savenewentry(newEntryData);

    setItem('');
    setAmount('');
    setDate('');

    props.hideadd();
  }

  return (
    <React.Fragment>
      <Modal
        show={props.show}
        aria-labelledby="contained-modal-title"
      >
        <Modal.Header closeButton onClick={props.hideadd}>
          <Modal.Title className="modalTitle" id="contained-modal-title">
            Add Entry
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
          <Button onClick={props.hideadd}>Close</Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
}


export default ContentAdder;