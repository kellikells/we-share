import React, { useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import fetch from 'isomorphic-unfetch';
import { GlobalContext } from '../context/GlobalState';

export const Item = ({ item }) => {
    const router = useRouter();

    const { deleteItem, useOne, useAll, } = useContext(GlobalContext);

 
    const [form, setForm] = useState({ itemName: item.itemName, itemQuantity: item.itemQuantity });

    //  ----- delete item function -----
    const handleDelete = async () => {
        // setIsDeleting(true);
        deleteItem(item._id);
        deleteItemDB();
    }




    const deleteItemDB = async () => {
        const itemId = item._id;
        try {
            const res = await fetch(`http://localhost:3000/api/items/${itemId}`, {
                method: "Delete"
            });
            router.push("/");
        } catch (error) {
            console.log(error)
        }
    }
    // ----------END: delete item---------------

    //  ----- useOne item function -----
    const handleClick = async (id) => {
        // setIsUsingOne(true);
        setForm({
            itemName: item.itemName,
            itemQuantity: item.itemQuantity - 1,
        });
        useOne(item._id);
        useOneDB(id);
    }


    const useOneDB = async (id) => {
        try {
            const res = await fetch(`http://localhost:3000/api/items/${id}`, {
                method: 'PUT',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            })
            router.push("/");
        } catch (error) {
            return (`error: ${error}`);
        }
    }
    // ----------END: useOne---------------

    //  ----- useAll items function -----
    const handleUseAll = async () => {
        // setIsUsingAll(true);
        setForm({
            itemName: item.itemName,
            itemQuantity: 0,
        });
        useAll(item._id);
        useAllDB();
    }



    const useAllDB = async () => {
        try {
            const res = await fetch(`http://localhost:3000/api/items/${item._id}`, {
                method: 'PUT',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            })
            router.push("/");
        } catch (error) {
            return (`error: ${error}`);
        }
    }

    // ----------END: useAll---------------


    // ternary operator to determine item color (have or don't have)
    const sign = item.itemQuantity <= 0 ? 'negative' : 'positive';

    return (

        <div className={sign == 'positive' ? 'list-item-container' : 'list-item-container-disabled'} key={item._id}>

            <div className='list-grid'>



                {/* ----- quantity ----- */}
                <div className='item-qty'>{item.itemQuantity}</div>

                {/* ----- item name ----- */}
                <div className={sign == 'positive' ? 'item-name' :
                    'item-name-disabled'} >
                    {item.itemName} - {item._id}
                </div>

                {/* ----- button group ----- */}
                <div className='item-btn-group' >

                    {/* ----- button: use 1 ----- */}
                    <button onClick={() => handleClick(item._id)}
                        className={sign == 'positive' ? 'btn-use-one' : 'btn-disabled'}
                    >
                        Use 1
                        </button>

                    {/* ----- button: use all ----- */}
                    <button onClick={handleUseAll}
                        className={sign == 'positive' ? 'btn-use-all' : 'btn-disabled'}>
                        Use All
                        </button>

                    {/* ----- button: delete ----- */}
                    <button onClick={handleDelete}
                        className='btn-delete'>
                        {/* <img src='/trash.svg' alt='delete item' /> */}Delete
                    </button>
                </div>

            </div>
        </div>
    );
}

