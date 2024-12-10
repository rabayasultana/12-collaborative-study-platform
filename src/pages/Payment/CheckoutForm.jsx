import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

const CheckoutForm = ({session}) => {

    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('')
    const [transactionId, setTransactionId] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [isBooked, setIsBooked] = useState(false);
    // console.log(session);


    useEffect(() => {
        if (session?.fee) {
            axiosSecure.post('/create-payment-intent', { fee: session.fee })
                .then(res => {
                    // console.log(res.data.clientSecret);
                    setClientSecret(res.data.clientSecret);
                })
        }

    }, [axiosSecure, session.fee])

    
  // Check if the session has already been booked
useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/bookedSessions?sessionId=${session._id}&studentEmail=${user?.email}`)
        .then((res) => {
            if (res.data.length > 0) {
                setIsBooked(true);
              }
            // console.log(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [axiosSecure, user?.email, session._id]);

// handle submit
const handleSubmit = async(event) => {
    event.preventDefault();

    if (!stripe || !elements) {
        return
    }

    const card = elements.getElement(CardElement)

    if (card === null) {
        return
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card
    })

    if (error) {
        console.log('payment error', error);
        setError(error.message);
    }
    else {
        console.log('payment method', paymentMethod)
        setError('');
    }

     // confirm payment
     const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
            card: card,
            billing_details: {
                email: user?.email || 'anonymous',
                name: user?.displayName || 'anonymous'
            }
        }
    })

    if (confirmError) {
        console.log('confirm error')
    }else {
        console.log('payment intent', paymentIntent)
        if (paymentIntent.status === 'succeeded') {
            console.log('transaction id', paymentIntent.id);
            setTransactionId(paymentIntent.id);

            // save session to booked session
            const newBookedSession = {
                title: session.title,
                tutorName: session.tutorName,
                description: session.description,
                registrationStart: session.registrationStart,
                registrationEnd: session.registrationEnd,
                classStart: session.classStart,
                classEnd: session.classEnd,
                duration: session.duration,
                fee: session.fee,
                status: session.status,
                sessionId: session._id,
                studentEmail: user.email,
                tutorEmail: session.tutorEmail,
              };

              axiosSecure
            .post('/bookedSession', newBookedSession)
            .then((res) => {
                console.log(res.data);
                if (res.data.insertedId) {
                    Swal.fire({
                      title: "Success!",
                      text: "Booked session uploaded successfully",
                      icon: "success",
                      confirmButtonText: "Ok",
                    });
                    setIsBooked(null);
                    window.location.reload();
                  }
            })
            .catch((err) => {
              console.error(err);
            });

            // now save the payment in the database
            const payment = {
                email: user.email,
                price: session.fee,
                transactionId: paymentIntent.id,
                date: new Date(), // utc date convert. use moment js to 
                status: 'pending'
            }

            const res = await axiosSecure.post('/payments', payment);
            console.log('payment saved', res.data);
            window.location.reload();
            if (res.data?.paymentResult?.insertedId) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Thank you for the taka paisa",
                    showConfirmButton: false,
                    timer: 1500
                });
            }

        }
    }

}

    return (
        <form onSubmit={handleSubmit}>
        <CardElement
            options={{
                style: {
                    base: {
                        fontSize: '16px',
                        color: '#424770',
                        '::placeholder': {
                            color: '#aab7c4',
                        },
                    },
                    invalid: {
                        color: '#9e2146',
                    },
                },
            }}
        />
        <button className="btn btn-sm btn-primary my-4" type="submit"
         disabled={!stripe || !clientSecret || isBooked }
         >
            Pay
        </button>
        <p className="text-red-600">{error}</p>
        {transactionId && <p className="text-green-600"> Your transaction id: {transactionId}</p>}
    </form>
);
};

export default CheckoutForm;