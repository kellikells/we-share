import React from 'react';

export const Form = () => {
    return (
        <div>
            <form>
                <input id="item_name" placeholder="item name" />

                <input id="item_quantity" placeholder="quantity" />

                <button type="submit">Add Item</button>
            </form>
        </div>
    );
}
