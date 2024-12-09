import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const Payment = () => {
    const location = useLocation(); // Access the location object
    const { session } = location.state || {}; 
    const { user } = useAuth();
    return (
        <div>
           <h2>Make payment</h2>
           <p className="mb-4">
        <strong>Session ID:</strong> {session._id || "Not available"}
      </p>
      <p className="mb-4">
        <strong>Student Email:</strong> {user.email || "Not available"}
      </p>
      <p className="mb-4">
        <strong>Session fee:</strong> {session.fee || "Not available"}
      </p>
           <Elements stripe={stripePromise}>
                <CheckoutForm session={session}></CheckoutForm>
            </Elements> 
        </div>
    );
};

export default Payment;