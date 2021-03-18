// import React, { useContext, useState, useEffect } from 'react';
// import { useRouter } from 'next/router';
// import fetch from 'isomorphic-unfetch';
import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

export const Item = ({ item }) => {
    // const router = useRouter();
    

    const { deleteItem, useOne, useAll, } = useContext(GlobalContext);


    // -------------------- END: useAll -----------------------


    // ternary operator to determine item color (have or don't have)
    const sign = item.itemQuantity <= 0 ? 'negative' : 'positive';

    return (

        <div className={sign == 'positive' ? 'list-item-container' : 'list-item-container-disabled'} key={item._id}>

            <div className='list-grid'>

                {/* ----- quantity ----- */}
                <div className='item-qty'>{item.itemQuantity} {item._id}</div>


                {/* ----- item name ----- */}
                <div className={sign == 'positive' ? 'item-name' :
                    'item-name-disabled'} >
                    {item.itemName}
                </div>


                {/* ----- button group ----- */}
                <div className='item-btn-group' >


                    {/* ----- button: use 1 ----- */}
                    <button onClick={() => useOne(item._id, item.itemName, item.itemQuantity)}
                        className={sign == 'positive' ? 'btn-use-one' : 'btn-disabled'}
                    >
                        Use 1
                        </button>


                    {/* ----- button: use all ----- */}
                    <button onClick={() => useAll(item._id, item.itemName)}
                        className={sign == 'positive' ? 'btn-use-all' : 'btn-disabled'}>
                        Use All
                        </button>


                    {/* ----- button: delete ----- */}

                    <button onClick={() => deleteItem(item._id)}
                        className='btn-delete'>
                        Delete
                    </button>

                    {/* ---------------------------------------------------- */}
                </div>

            </div>
        </div>
    );
}


    //  useState 
    // const [isDeleting, setIsDeleting] = useState(false);
    // const [isUsingOne, setIsUsingOne] = useState(false);
    // const [isUsingAll, setIsUsingAll] = useState(false);
    // const [form, setForm] = useState({ itemName: item.itemName, itemQuantity: item.itemQuantity });

    //  ----- delete item function -----
    // const handleDelete = async () => {
    //     setIsDeleting(true);
    // }

    // useEffect(() => {
    //     if (isDeleting) {
    //         deleteItem(item._id);
    //         deleteItemDB();

    //         console.log(`http://localhost:3000/api/items/${item._id}`);

    //     }
    // }, [isDeleting]);


    // const deleteItemDB = async () => {

    //     try {
    //         const res = await fetch(`http://localhost:3000/api/items/${item._id}`, {
    //             method: "Delete"
    //         });
    //         router.push("/");
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }
    // // ----------END: delete item---------------

    // //  ----- useOne item function -----
    // const handleUseOne = async () => {
    //     setIsUsingOne(true);
    //     setForm({
    //         itemName: item.itemName,
    //         itemQuantity: item.itemQuantity - 1,
    //     });
    // }

    // useEffect(() => {
    //     if (isUsingOne) {
    //         useOne(item._id);
    //         useOneDB();

    //         console.log(`http://localhost:3000/api/items/${item._id}`);
    //     }
    // }, [isUsingOne]);

    // const useOneDB = async () => {
    //     try {
    //         const res = await fetch(`http://localhost:3000/api/items/${item._id}`, {
    //             method: 'PUT',
    //             headers: {
    //                 "Accept": "application/json",
    //                 "Content-Type": "application/json"
    //             },
    //             body: JSON.stringify(form)
    //         })
    //         router.push("/");
    //     } catch (error) {
    //         return (`error: ${error}`);
    //     }
    // }
    // // ----------END: useOne---------------

    // //  ----- useAll items function -----
    // const handleUseAll = async () => {
    //     setIsUsingAll(true);
    //     setForm({
    //         itemName: item.itemName,
    //         itemQuantity: 0,
    //     });
    // }

    // useEffect(() => {
    //     if (isUsingAll) {
    //         useAll(item._id);
    //         useAllDB();

    //         console.log(`http://localhost:3000/api/items/${item._id}`)
    //     }
    // }, [isUsingAll]);

    // const useAllDB = async () => {
    //     try {
    //         const res = await fetch(`http://localhost:3000/api/items/${item._id}`, {
    //             method: 'PUT',
    //             headers: {
    //                 "Accept": "application/json",
    //                 "Content-Type": "application/json"
    //             },
    //             body: JSON.stringify(form)
    //         })
    //         router.push("/");
    //     } catch (error) {
    //         return (`error: ${error}`);
    //     }
    // }