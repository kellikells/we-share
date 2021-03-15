import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';


import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import fetch from 'isomorphic-unfetch';


export const Item = ({ item }) => {

    const { useOne, useAll, deleteItem } = useContext(GlobalContext);
    // const { deleteItem } = useContext(GlobalContext);


    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);

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




    // ternary operator to determine item color (have or don't have)
    const sign = item.itemQuantity <= 0 ? 'negative' : 'positive';


    return (

        <div key={item._id} className={sign == 'positive' ? 'list-item' : 'list-item-disabled'}>

            <div className='list-grid'>

                {/* ----- button: delete ----- */}
                <button onClick={handleDelete} className='btn-delete'>
                {/* <button
                    onClick={() => deleteItem(item._id)}
                    className='btn-delete'> */}
                    
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
                    <button onClick={() => useOne(item._id)} className='btn-use-one'>Use 1</button>

                    {/* ----- button: use all ----- */}
                    <button onClick={() => useAll(item._id)} className='btn-use-all'>Use All</button>

                </div>


                {/* ----- button: delete ----- */}
                {/* <button onClick={() => deleteItem(item.id)} className={sign == 'positive' ? 'btn-delete' : 'btn-delete-disabled'}>
                    <img src='/trash.svg' alt='delete item' />
                </button> */}

            </div>
        </div>
    );
}

// Item.getInitialProps = async ({ query: { id } }) => {
//     const res = await fetch(`http://localhost:3000/api/items/${id}`);
//     const { data } = await res.json();

//     return { item: data }
// }

// export default Note;