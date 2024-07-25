import React from 'react'

const index = ({data}) => {
  
  let expense = 0, income=0, balance=0;
  
  const calculateData = (data) =>  {
    

    data.forEach(item => {
        if (item.type === 'expense') {
             expense = expense + Number(item.value);
            
        }
        else if (item.type === 'income') {

          income= income + Number(item.value);
        }

        balance = income - expense;

    });

}

calculateData(data);

  return (





    <div className='py-5'>

        <div className='flex flex-col items-start p-5'>
            
            <h1 className='text-4xl font-semibold '>Expense Tracker</h1>
            <h2 className='text lg mt-5'>YOUR BALANCE</h2>
            <h1 className='text-4xl  mt-3'>$ {balance.toFixed(2)}</h1>

        </div>

        <div className='flex justify-around mx-5 py-6 px-2 bg-white border rounded shadow'>
        
        <div>
            <h3 className='font-bold'>INCOME</h3>
            <p className='text-green-500'>+$ {income}</p>
        </div>

        <div className='border-l border-gray-300 h-10 mx-4'></div>

        <div>
            <h3 className='font-bold'>EXPENSE</h3>
            <p className='text-red-500'>-$ -{expense}</p>
        </div>

        </div>

    </div>
  )
}

export default index