import React from 'react';

export const DataTable = () => {
    return (

        <div>
            <table>

                <tr>
                    <th>checkbox</th>
                    <th>quantity</th>
                    <th>Item</th>
                    <th>Options</th>
                </tr>

                {/* this will hold the data  */}
                <tr>
                    <td>box</td>
                    <td>-3+</td>
                    <td>corn</td>
                    <td>edit btn</td>
                </tr>

            </table>
        </div>

    );
}
