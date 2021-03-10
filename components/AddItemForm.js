import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import fetch from 'isomorphic-unfetch';

export const AddItemForm = () => {
    const [form, setForm] = useState({ itemName: '', itemQuantity: 0 });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const router = useRouter();

    useEffect(() => {
        if (isSubmitting) {
            if (Object.keys(errors).length === 0) {
                createItem();
            }
            else {
                setIsSubmitting(false);
            }
        }
    }, [errors])

    const createItem = async () => {
        try {
            const res = await fetch('http://localhost:3000/api/items', {
                method: 'POST',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            })
            router.push("/");
        } catch (error) {
            console.log(error);
        }
    }

    // form submission 

    const handleSubmit = (e) => {
        e.preventDefault();
        let errs = validate();
        setErrors(errs);
        setIsSubmitting(true);
    }

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const validate = () => {
        let err = {};

        if (!form.itemName) {
            err.itemName = 'item name is required';
        }
        if (!form.itemQuantity) {
            err.itemQuantity = 'quantity is required';
        }

        return err;
    }


    // const [itemName, setItemName] = useState('');
    // const [itemQuantity, setItemQuantity] = useState(0);

    // const { addItem } = useContext(GlobalContext);

    // const onSubmit = e => {
    //     e.preventDefault();

    //     const newItem = {
    //         id: Math.floor(Math.random() * 100000000),
    //         itemName,
    //         itemQuantity: +itemQuantity
    //     }
    //     addItem(newItem);
    // }

    return (
        <div>


            {
                isSubmitting
                    ? <p> it's loading </p>
                    :<>
                    <form form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-3">

                            <div className="col-span-2 ...">
                                <label htmlFor='itemName'>Item Name</label>

                                <input
                                    className='form-input'
                                    type='text'
                                    placeholder='enter item name'
                                    // value={itemName}
                                    name='itemName'
                                    // onChange={(e) => setItemName(e.target.value)}
                                        error = {errors.itemName ? { content: 'Please enter an item name'} : null}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="...">
                                <label htmlFor='itemQuantity'>Qty</label>

                                <input className='form-input'
                                    type='number'
                                    placeholder='enter quantity'
                                    // value={itemQuantity}
                                    name='itemQuantity'
                                    // onChange={(e) => setItemQuantity(e.target.value)}
                                    error= {errors.itemQuantity ? {content : 'Please put a number'} : null}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-span-3 ...">
                                <button type='submit' className='add-btn focus:bg-green-400'>Add Item</button>
                            </div>
                        </div>

                        </form>
                        </>
            }
        </div >
    );
}