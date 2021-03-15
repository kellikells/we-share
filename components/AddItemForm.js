import React, { useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import fetch from 'isomorphic-unfetch';
import { GlobalContext } from '../context/GlobalState';

export const AddItemForm = () => {
    const router = useRouter();

    const { addItem } = useContext(GlobalContext);

    const [form, setForm] = useState({ itemName: '', itemQuantity: 0 });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});

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

    useEffect(() => {
        if (isSubmitting) {
            addItem(form)
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

   


    return (
        <div>

            <form onSubmit={handleSubmit}>

                <div className="grid grid-cols-3">

                    <div className="col-span-2 ...">
                        <label htmlFor='itemName'>Item Name</label>

                        <input
                            onChange={handleChange}
                            name='itemName'
                            className='form-input'
                            type='text'
                            placeholder='enter item name'
                            error={errors.itemName ? { content: 'Please enter an item name' } : null}
                        />

                    </div>

                    <div className="...">
                        <label htmlFor='itemQuantity'>Qty</label>

                        <input
                            onChange={handleChange}
                            name='itemQuantity'
                            className='form-input'
                            type='number'
                            placeholder='enter quantity'
                            error={errors.itemQuantity ? { content: 'Please put a number' } : null}
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