import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

import useToggle from '../hooks/useToggle';




export const Item = ({ item }) => {

    const { deleteItem, useOne, useAll, getItems } = useContext(GlobalContext);

    // ternary operator to determine item color (have or don't have)
    const sign = item.itemQuantity <= 0 ? 'negative' : 'positive';

    // this is to toggle buttons when mobile screen 
    const [isMobileSize, toggleIsMobileSize] = useToggle(false)

    return (

        <div className={sign == 'positive' ? 'flex-wrap items-center justify-center text-lg my-2 bg-white shadow-xl border border-gray-300' : 'opacity-50'} key={item._id}>

            <div className='flex md:grid md:grid-cols-11  w-full'>

                {/* ----- quantity ----- */}
                <div className='p-2 flex md:flex-col justify-center md:col-span-1 text-center'>{item.itemQuantity} </div>

                {/* ----- item name ----- */}
                <div className={sign == 'positive' ? 'p-2 flex-wrap flex-col justify-center col-span-4 font-bold' :
                    'col-span-4 p-2 line-through'} >
                    {item.itemName}
                </div>




                {/* ----- MEDIUM SCREEN + : button group ----- */}
                <div className='invisible md:visible col-span-6 flex justify-end items-center space-x-2  text-center' >

                    {/* ----- button: use 1 ----- */}
                    <button onClick={() => {
                        useOne(item._id, item.itemName, item.itemQuantity);
                        getItems();
                    }}
                        className={sign == 'positive' ? 'btn-use-one' : ''}
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
                        className='btn-delete'>
                        Delete
                    </button>

                </div>
                {/* -------------END: medium screen buttons----------- */}



                {/* ----- MOBILE SCREEN : toggle buttons ----- */}
                <div className='md:hidden flex justify-end items-center'>

                    <button onClick={toggleIsMobileSize} className='mobile-menu-button'>
                        <img className='w-6 h-6' src='/mobile-menu-btn.svg' alt='mobile-menu-button' />
                    </button>

                </div>

                {/* ----- MOBILE SCREEN : button group ----- */}
                <div className={isMobileSize ? 'mobile-menu w-min md:hidden' : 'hidden mobile-menu md:hidden'}>

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
                        className='btn-delete'>
                        Delete
                    </button>
                    {/* <section className='border-b border-gray-500'>
                        {menu?.length && menu.map((info, index) => (
                            <Link key={index} href={info == 'Home' ? `/` : `/${info}`}>
                                <a className='block py-2 px-4 text-sm hover:bg-gray-300'>{info}</a>
                            </Link>
                        ))}
                    </section>


                    {menu?.length && menu.map((topic, index) => (
                        <Link key={index} href={`/${topic}`}>
                            <a className='block py-2 px-4 text-sm hover:bg-gray-300'>{topic}</a>
                        </Link>
                    ))} */}
                </div>

            </div>
        </div>
    );
}

