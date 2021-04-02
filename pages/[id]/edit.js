import { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';
import { useRouter } from 'next/router';

const EditItem = ({ item }) => {
    const [form, setForm] = useState({ itemName: item.itemName, itemQuantity: item.itemQuantity });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const router = useRouter();

    useEffect(() => {
        if (isSubmitting) {
            if (Object.keys(errors).length === 0) {
                updateItem();
            }
            else {
                setIsSubmitting(false);
            }
        }
    }, [errors])

    const updateItem = async () => {
        try {
            const res = await fetch(`http://localhost:3000/api/items/${router.query.id}`, {
                method: 'PUT',
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
            err.itemName = 'Item name required';
        }
        if (!form.itemQuantity) {
            err.itemQuantity = 'Item quanitty is required';
        }

        return err;
    }

    return (
        <div className="form-container">
            <h1>Update Note</h1>
            <div>
                {
                    isSubmitting
                        ? <Loader active inline='centered' />
                        : <Form onSubmit={handleSubmit}>
                            <Form.Input
                                fluid
                                error={errors.title ? { content: 'Please enter a title', pointing: 'below' } : null}
                                label='Title'
                                placeholder='Title'
                                name='title'
                                value={form.title}
                                onChange={handleChange}
                            />
                            <Form.TextArea
                                fluid
                                label='Description'
                                placeholder='Description'
                                name='description'
                                error={errors.description ? { content: 'Please enter a description', pointing: 'below' } : null}
                                value={form.description}
                                onChange={handleChange}
                            />
                            <Button type='submit'>Update</Button>
                        </Form>
                }
            </div>
        </div>
    )
}

EditItem.getInitialProps = async ({ query: { id } }) => {
    const res = await fetch(`http://localhost:3000/api/items/${id}`);
    const { data } = await res.json();

    return { note: data }
}

export default EditItem;