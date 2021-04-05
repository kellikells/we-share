import React, { useState, useContext } from 'react'
import { GlobalContext } from '../context/GlobalState';

export const AddItemForm = () => {

    const [itemName, setItemName] = useState('');
    const [itemQuantity, setItemQuantity] = useState(0);

    const { addItem, getItems } = useContext(GlobalContext);

    const onSubmit = e => {
        e.preventDefault();
        const newItem = {
            itemName,
            itemQuantity: +itemQuantity
        }
        addItem(newItem);
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
                            id='name-input'
                            onChange={(e) => setItemName(e.target.value)} 
                            value={itemName}
                            className='form-input'
                            type='text'
                            placeholder='enter item name'
                            // error={errors.itemName ? { content: 'Please enter an item name' } : null}
                        />
                    </div>

                    <div className="...">
                        <label htmlFor='itemQuantity'>Qty</label>
                        <input
                            id='quantity-input'
                            onChange={(e) => setItemQuantity(e.target.value)} 
                            value={itemQuantity}
                            className='form-input'
                            type='number'
                            placeholder='enter quantity'
                            // error={errors.itemQuantity ? { content: 'Please put a number' } : null}
                        />
                    </div>

                    <div className="col-span-3 ...">
                        <button type='submit' className='add-btn focus:bg-green-400'>Add Item</button>
                    </div>
                </div>

            </form>

        </div >
    );
}


