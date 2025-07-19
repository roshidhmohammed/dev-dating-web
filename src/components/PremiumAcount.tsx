import { useEffect, useState } from "react";
import { axiosInstance } from "../utils/apis/axiosInstance";

const PremiumAcount = () => {
  const [isUserPremium, setIsUserPremium] = useState(false);
  useEffect(() => {
    verifyPremiumUser();
  }, []);
  const verifyPremiumUser = async () => {
    await axiosInstance
      .get("/payment/verify", { withCredentials: true })
      .then((res) => {
        console.log(res)
        if (res.data.user.isPremium) {
          setIsUserPremium(true);
        }
      });
  };

  const handlePremium = async (type: string) => {
    await axiosInstance
      .post(
        "payment/create",
        { membershipType: type },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res);

        const { keyId, amount, currency, orderId, notes } =
          res.data;

        const options = {
          key: keyId,
          amount: amount,
          currency: currency,
          name: "Matchalorie",
          description: "Matcalorie premium account subscription",
          order_id: orderId,
          // callback_url: 'http://localhost:5173/payment-success',
          prefill: {
            name: notes.firstname + " " + notes.lastName,
            email: notes.emailId,
            membershipType: notes.membershipType,
            contact: "7511190408",
          },
          theme: {
            color: "#F37254",
          },
          handler: verifyPremiumUser,
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
   <>
    {isUserPremium ?(
      <h1 className=" mt-20">You are a verified User</h1>
    ):(

    <div className="flex w-full my-auto px-10 ">
      <div className="card bg-base-300 rounded-box grid py-10 grow place-items-center">
        <div>
          <h1 className=" text-2xl text-gray-300   font-bold tracking-wider">
            Silver Membership
          </h1>
          <ul className=" mt-5 text-gray-400">
            <li className=" list-disc">Chat with other people</li>
            <li className=" list-disc">100 connection request per day</li>
            <li className=" list-disc">Blue Tick</li>
            <li className=" list-disc">3 months validity</li>
          </ul>
        </div>
        <button
          className="btn btn-secondary mt-5 min-w-40"
          onClick={() => handlePremium("silver")}
        >
          Buy Silver
        </button>
      </div>
      <div className="divider divider-horizontal">OR</div>
      <div className="card bg-base-300 rounded-box grid  py-10 grow place-items-center">
        <div>
          <h1 className=" text-2xl text-gray-300  font-bold tracking-wider">
            Gold Membership
          </h1>
          <ul className=" mt-5 text-gray-400">
            <li className=" list-disc">Chat with other people</li>
            <li className=" list-disc">Unlimited connection request per day</li>
            <li className=" list-disc">Blue Tick</li>
            <li className=" list-disc">6 months validity</li>
          </ul>
        </div>
        <button
          className="btn btn-primary mt-5 min-w-40"
          onClick={() => handlePremium("gold")}
        >
          Buy Gold
        </button>
      </div>
    </div>
    )}
   </>
  );
};

export default PremiumAcount;
