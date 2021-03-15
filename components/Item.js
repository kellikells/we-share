import React, { useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import fetch from 'isomorphic-unfetch';
import { GlobalContext } from '../context/GlobalState';

export const Item = ({ item }) => {
    const router = useRouter();

    const { deleteItem, useOne, useAll, } = useContext(GlobalContext);

    //  useState 
    const [isDeleting, setIsDeleting] = useState(false);
    const [isUsingOne, setIsUsingOne] = useState(false);
    const [isUsingAll, setIsUsingAll] = useState(false);
    const [form, setForm] = useState({ itemName: item.itemName, itemQuantity: item.itemQuantity });

    //  ----- delete item function -----
    const handleDelete = async () => {
        setIsDeleting(true);
    }

    useEffect(() => {
        if (isDeleting) {
            deleteItem(item._id);
            deleteItemDB();
        }
    }, [isDeleting]);


    const deleteItemDB = async () => {
        // const itemId = router.query.id;
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
    const handleUseOne = async () => {
        setIsUsingOne(true);
        setForm({
            itemName: item.itemName,
            itemQuantity: item.itemQuantity - 1,
        });
    }

    useEffect(() => {
        if (isUsingOne) {
            useOne(item._id);
            useOneDB();
        }
    }, [isUsingOne]);

    const useOneDB = async () => {
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
    // ----------END: useOne---------------

    //  ----- useAll items function -----
    const handleUseAll = async () => {
        setIsUsingAll(true);
        setForm({
            itemName: item.itemName,
            itemQuantity: 0,
        });
    }

    useEffect(() => {
        if (isUsingAll) {
            useAll(item._id);
            useAllDB();
        }
    }, [isUsingAll]);

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

        <div key={item._id} className={sign == 'positive' ? 'list-item' : 'list-item-disabled'}>

            <div className='list-grid'>

                {/* ----- button: delete ----- */}
                <button onClick={handleDelete}
                    className='btn-delete'>
                    <img src='/trash.svg' alt='delete item' />
                </button>

                {/* ----- quantity ----- */}
                <div className='item-qty'>{item.itemQuantity}</div>

                {/* ----- item name ----- */}
                <div className={sign == 'positive' ? 'item-name' :
                    'item-name-disabled'} >
                    {item.itemName}
                </div>

                {/* ----- button group ----- */}
                <div className={sign == 'positive' ? 'item-btn-group' : 'item-btn-group-disabled'} >

                    {/* ----- button: use 1 ----- */}
                    <button onClick={handleUseOne}
                        className='btn-use-one'>
                        Use 1
                        </button>

                    {/* ----- button: use all ----- */}
                    <button onClick={handleUseAll}
                        className='btn-use-all'>
                        Use All
                        </button>

                </div>
            </div>
        </div>
    );
}

