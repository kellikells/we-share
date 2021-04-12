import React, { useState, useContext } from 'react'
import { GlobalContext } from '../context/GlobalState';

export const AddItemForm = () => {
    const { addItem, getItems } = useContext(GlobalContext);

    const [itemName, setItemName] = useState('');
    const [itemQuantity, setItemQuantity] = useState(0);
    // const [errors, setErrors] = useState();
  

    const onSubmit = e => {
        e.preventDefault();
        const newItem = {
            itemName,
            itemQuantity: +itemQuantity
        }
        // setErrors()
        addItem(newItem);

        // clear the form inputs
        setItemName('');
        setItemQuantity(0);
        getItems();
    }

    return (
        <div>
           

            <form onSubmit={onSubmit}>
                <div className="grid grid-cols-3">

                    <div className="col-span-2 ...">
                        <label htmlFor='itemName'>Item Name</label>
                        <input
                            name='name' 
                            id='name-input'
                            onChange={(e) => setItemName(e.target.value)}
                            value={itemName}
                            className=' w-full border-gray-400 border-solid border-2 p-2.5 text-lg'
                            type='text'
                            placeholder='enter item name'
                        // errors={errors.itemName ? { content: 'Please enter an item name' } : null}
                        />
                    </div>

                    <div className="...">
                        <label htmlFor='itemQuantity'>Qty</label>
                        <input
                            name='quantity' 
                            id='quantity-input'
                            onChange={(e) => setItemQuantity(e.target.value)}
                            value={itemQuantity}
                            className=' w-full border-gray-400 border-solid border-2 p-2.5 text-lg'
                            type='number'
                            placeholder='enter quantity'
                        />
                        {/* {errors.itemQuantity ? { content: 'Please put a number' } : null } */}
                    </div>

                    <div className="col-span-3 ...">
                        <button type='submit' className='
                        block text-xl tracking-wider font-bold mb-2.5 mr-0 p-2.5 w-full
                        shadow-inner border-2 border-solid
                        border-green-600
                        bg-green-500 hover:bg-green-600
                        text-white
                        transition duration-300 focus:bg-green-400'>Add Item</button>
                    </div>
                </div>

            </form>

        </div >
    );
}


