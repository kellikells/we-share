import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

import useToggle from '../hooks/useToggle';




export const Item = ({ item }) => {


    // const { deleteItem, useOne, useAll, getItems, toggleShowButtons, showButtons } = useContext(GlobalContext);
    const { deleteItem, useOne, useAll, getItems } = useContext(GlobalContext);

    console.log(showButtons);
    // ternary operator to determine item color (have or don't have)
    const sign = item.itemQuantity <= 0 ? 'negative' : 'positive';




    // this is to toggle buttons when mobile screen 
    // const [showButtons, toggleShowButtons] = useToggle(false);
    const [showButtons, toggleShowButtons] = useToggle(false)


 

    return (

        <div className={'flex mx-auto items-center justify-between text-lg my-2 bg-white shadow-xl border border-gray-300'} key={item._id}>

            <div className='flex space-x-4'>

                {/* ----- quantity ----- */}
                <div className={sign == 'positive' ? 'p-2 flex justify-center text-center' : 'text-red-600 p-2 flex justify-center text-center'}>{item.itemQuantity} </div>

                {/* ----- item name ----- */}
                <div className={sign == 'positive' ? 'p-2 flex-wrap  justify-center font-bold' :
                    'opacity-50 line-through p-2 flex-wrap justify-center'} >
                    {item.itemName}
                </div>

            </div>


            {/* ----- MEDIUM SCREEN + : button group ----- */}
            <div className='invisible md:visible md:flex md:justify-end md:items-center md:space-x-2  md:text-center' >

                {/* ----- button: use 1 ----- */}
                <button onClick={() => {
                    useOne(item._id, item.itemName, item.itemQuantity);
                    getItems();
                }}
                    className={sign == 'positive' ? 'btn-use-one' : 'hidden'}
                >
                    Use 1
                </button>

                {/* ----- button: use all ----- */}
                <button onClick={() => {
                    useAll(item._id, item.itemName);
                    getItems();
                }}
                    className={sign == 'positive' ? 'btn-use-all' : 'hidden'}>
                    Use All
                </button>

                {/* ----- button: delete ----- */}
                <button onClick={() => {
                    deleteItem(item._id);
                    getItems();
                }}
                    className='btn-delete opacity-100'>
                    Delete
                </button>

            </div>
            {/* -------------END: medium screen buttons----------- */}

            {/* ---------------------------------------------------------------- */}

            

            {/* ------ MOBILE WRAPPER ------ */}
            <div className='relative inline-block md:hidden'>
                {/* ----- MOBILE SCREEN : toggle buttons ----- */}
                <div className='md:hidden flex relative justify-content-end justify-end'>

                    <button onClick={toggleShowButtons} className='mobile-menu-button'>
                        <img className='w-6 h-6' src='/mobile-menu-btn.svg' alt='mobile-menu-button' />
                    </button>

                    {/* <button onClick={() => {
                        toggleShowButtons(item._id);
                        getItems();
                    }}
                        className='mobile-menu-button'>
                        <img className='w-6 h-6' src='/mobile-menu-btn.svg' alt='mobile-menu-button' />
                    </button> */}

                </div>

                {/* ----- MOBILE SCREEN : button group ----- */}
                <div className={showButtons ? 'mobile-menu w-min origin-top-right absolute right-0 inline-block ' : 'hidden mobile-menu'}>

                    {/* ----- button: use 1 ----- */}
                    <button onClick={() => {
                        useOne(item._id, item.itemName, item.itemQuantity);
                        getItems()
                        toggleShowButtons();
                    }}
                        className={sign == 'positive' ? 'btn-use-one-mobile mobile' : 'hidden'}
                    >
                        Use 1
                    </button>

                    {/* ----- button: use all ----- */}
                    <button onClick={() => {
                        useAll(item._id, item.itemName);
                        getItems()
                        toggleShowButtons();
                    }}
                        className={sign == 'positive' ? 'btn-use-all-mobile mobile' : 'hidden'}>
                        Use All
                    </button>

                    {/* ----- button: delete ----- */}
                    <button onClick={() => {
                        deleteItem(item._id);
                        getItems()
                        toggleShowButtons();
                    }}
                        className='btn-delete-mobile mobile'>
                        Delete
                    </button>

                </div>

            </div>
        </div>
    );
}

