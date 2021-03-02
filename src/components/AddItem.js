import React, { useState, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

export const AddItem = () => {
    const [itemName, setItemName] = useState('');
    const [itemQuantity, setItemQuantity] = useState(0);

    const { addItem } = useContext(GlobalContext);

    const onSubmit = e => {
        e.preventDefault();

        const newItem = {
            id: Math.floor(Math.random() * 100000000),
            itemName,
            itemQuantity: +itemQuantity
        }

        addItem(newItem);
    }

    return (
        <div className='section'>
            <h3>Add New Item:</h3>

            <form onSubmit={onSubmit} className='AddItemForm'>
                <table>

                    <tr>
                        <td><label htmlFor='itemName'>Text</label></td>
                        <td>
                            {/* onChange event for whatever is being typed in  */}
                            <input type='text' value={itemName} onChange={(e) => setItemName(e.target.value)} placeholder='Item name...' />
                        </td>
                    </tr>

                    <tr>
                        <td><label htmlFor='itemQuantity'>Qty</label></td>
                        <td>
                            <input type='number' value={itemQuantity} onChange={(e) => setItemQuantity(e.target.value)} placeholder='Enter quantity...' />
                        </td>
                    </tr>

                    <button className='btn'>Add Item</button>
                </table>
            </form>

        </div >
    );
}
