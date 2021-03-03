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
        <>
            <div className='section-title'>Add New Item:</div>

            <form onSubmit={onSubmit}>

                <table className='section section-form'>
                    <tr>
                        <td className='form-group item-name'>
                            <label htmlFor='itemName'>Item Name</label>
                            {/* onChange event for whatever is being typed in  */}
                            <input type='text' value={itemName} onChange={(e) => setItemName(e.target.value)} placeholder='Item name...' />
                        </td>

                        <td className='form-group item-quantity'>
                            <label htmlFor='itemQuantity'>Qty</label>
                            <input type='number' value={itemQuantity} onChange={(e) => setItemQuantity(e.target.value)} placeholder='Enter quantity...' />
                        </td>
                    </tr>
                </table >

                <button className='add-btn focus:bg-green-400'>Add Item</button>

            </form>

        </>
        // <div className='section section-form'>
        //     <div className='section-title'>Add New Item:</div>

        //     <form onSubmit={onSubmit}>

        //         <div className='form-group-item-name'>
        //             <label htmlFor='itemName'>Item Name</label>
        //             {/* onChange event for whatever is being typed in  */}
        //             <input type='text' value={itemName} onChange={(e) => setItemName(e.target.value)} placeholder='Item name...' />
        //         </div>

        //         <div className='form-group-item-quantity'>
        //             <label htmlFor='itemQuantity'>Qty</label>
        //             <input type='number' value={itemQuantity} onChange={(e) => setItemQuantity(e.target.value)} placeholder='Enter quantity...' />
        //         </div>

        //         <button className='add-btn focus:bg-green-400'>Add Item</button>



        //     {/* <button className='add-btn focus:bg-green-400'>Add Item</button> */}

        //     </form>

        // </div >
    );
}
