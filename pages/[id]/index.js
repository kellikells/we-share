import fetch from 'isomorphic-unfetch';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const Item = ({ Item }) => {
    const [confirm, setConfirm] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (isDeleting) {
            deleteItem();
        }
    }, [isDeleting])

    const open = () => setConfirm(true);

    const close = () => setConfirm(false);

    const deleteItem = async () => {
        const itemId = router.query.id;
        try {
            const deleted = await fetch(`http://localhost:3000/api/items/${itemId}`, {
                method: "Delete"
            });

            router.push("/");
        } catch (error) {
            console.log(error)
        }
    }

    const handleDelete = async () => {
        setIsDeleting(true);
        close();
    }

    return (
        <div className="Item-container">
            {isDeleting
                ? <Loader active />
                :
                <>
                    <h1>{Item.title}</h1>
                    <p>{Item.description}</p>
                    <Button color='red' onClick={open}>Delete</Button>
                </>
            }
            <Confirm
                open={confirm}
                onCancel={close}
                onConfirm={handleDelete}
            />
        </div>
    )
}

Item.getInitialProps = async ({ query: { id } }) => {
    const res = await fetch(`http://localhost:3000/api/items/${id}`);
    const { data } = await res.json();

    return { Item: data }
}

export default Item;