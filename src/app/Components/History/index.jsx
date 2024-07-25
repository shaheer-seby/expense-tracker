'use client';

import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { db, collection, getDocs, addDoc, deleteDoc, doc } from '/utils/firebase.js';

const Index = ({ setData }) => {
  const [warning, setWarning] = useState('');
  const [transactionName, setTransactionName] = useState('');
  const [amount, setAmount] = useState('');
  const [transactionList, setTransactionList] = useState([]);

  const notifyDelete = () => toast.error("Transaction Deleted", {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });

  const notifyAdd = () => toast.success("Transaction Added", {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        if (db) {
          const querySnapshot = await getDocs(collection(db, 'transactions'));
          const transactions = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setTransactionList(transactions);
        }
      } catch (error) {
        console.error('Error fetching transactions: ', error);
      }
    };
    fetchTransactions();
  }, []);

  useEffect(() => {
    setData(transactionList);
  }, [transactionList, setData]);

  const handleButtonClick = async (type) => {
    if (!transactionName || !amount) {
      if (!transactionName && amount) {
        setWarning('Please enter the Transaction name.');
      } else if (!amount && transactionName) {
        setWarning('Please enter the Transaction amount.');
      } else if (!transactionName || !amount) {
        setWarning('Please fill both fields.');
      }
    } else if (amount < 0) {
      setWarning('Amount cannot be negative.');
    } else {
      const newTransaction = {
        title: transactionName,
        value: parseFloat(amount),
        type: type,
      };

      if (transactionList.find((item) => item.title === newTransaction.title)) {
        alert('Duplicates are not allowed in the list.');
      } else {
        try {
          const docRef = await addDoc(collection(db, 'transactions'), newTransaction);
          setTransactionList([...transactionList, { id: docRef.id, ...newTransaction }]);
          setTransactionName('');
          setAmount('');
          setWarning('');
          notifyAdd();
          console.log('Data Added');
        } catch (error) {
          console.error('Error adding document: ', error);
        }
      }
    }
  };

  const handleClick = async (transaction) => {
    const isConfirmed = true;
    if (isConfirmed) {
      try {
        const docRef = doc(db, 'transactions', String(transaction.id));
        await deleteDoc(docRef);
        setTransactionList(transactionList.filter((item) => item.id !== transaction.id));
        notifyDelete();
        console.log('Document deleted successfully');
      } catch (error) {
        console.error('Error deleting document: ', error);
      }
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className="p-6">
        {transactionList.length === 0 ? <p>No transaction history</p> : (
          <div>
            <h2 className="text-xl font-bold mb-4">History</h2>
            <hr className="border-t border-gray-400 my-4" />
          </div>
        )}
        {transactionList.map((transaction) => (
          <div key={transaction.id} className={`flex justify-between items-center mb-4 p-4 bg-white border rounded shadow-sm border-r-4 ${transaction.type === 'expense' ? 'border-r-red-500' : 'border-r-green-500'}`}>
            <p>{transaction.title}</p>
            <p>${transaction.value}</p>
            <button onClick={() => handleClick(transaction)} className="flex items-center bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md shadow-sm transition duration-200 ease-in-out">
              x
            </button>
          </div>
        ))}
      </div>
      <div className="p-6">
        <h2 className="text-xl font-bold mb-2">Add Transaction</h2>
        <hr className='border-t border-gray-400' />
        <div className="flex xsm-flex-wrap justify-between gap-2 mt-4">
          <input
            type="text"
            id="transaction-name"
            className="p-2 border rounded bg-gray-100"
            placeholder="Transaction name"
            value={transactionName}
            onChange={(e) => setTransactionName(e.target.value)}
          />
          <input
            type="number"
            id="amount"
            className="p-2 border rounded bg-gray-100"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        {warning && <p className="text-red-500 mt-2">{warning}</p>}
        <div className="flex justify-around mt-5 gap-2 xsm-flex-wrap w-full sm:w-auto">
          <button
            className="px-16 py-2 bg-red-400 text-white rounded hover:bg-red-600 w-full"
            onClick={() => handleButtonClick('expense')}
          >
            Expense
          </button>
          <button
            className="px-16 py-2 bg-green-400 text-white rounded hover:bg-green-600 w-full"
            onClick={() => handleButtonClick('income')}
          >
            Income
          </button>
        </div>
      </div>
    </div>
  );
};

export default Index;
