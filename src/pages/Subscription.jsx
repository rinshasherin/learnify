import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


function Subscription() {

    const [success, setSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const nav = useNavigate()

    const handleApprove = (orderID) => {
        setSuccess(true);
        toast.success("Payment Successful!")
        nav('/')

        console.log("Order successful! Order ID:", orderID);
    };

    return (
        <>
            <div className='container d-flex justify-content-center align-items-center' style={{ height: '100vh' }}>
                <div className='w-25 border shadow p-5'>
                    <PayPalScriptProvider options={{ "client-id": "ATDkKzhNvlrt7dom0qBvtKx0dRFjgMk9ix7UkegAIMQ02yOkDcxOSINJgrcXUrzO4VFtQwNFo2pBHtK6" }}>
                        {success ? (
                            // <h2>Payment Successful!</h2>
                            <></>
                        ) : (
                            <PayPalButtons
                                createOrder={(data, actions) => {
                                    return actions.order.create({
                                        purchase_units: [
                                            {
                                                amount: {
                                                    value: "10.00", // Replace with your price
                                                },
                                            },
                                        ],
                                    });
                                }}
                                onApprove={async (data, actions) => {
                                    const order = await actions.order.capture();
                                    handleApprove(order.id);
                                }}
                                onError={(err) => {
                                    setErrorMessage("Something went wrong with the payment.");
                                    console.error(err);
                                }}
                            />
                        )}
                        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
                    </PayPalScriptProvider>
                </div>
            </div>

        </>
    )
}

export default Subscription