import { useState } from 'react';

type RedeemPointsProps = {
  totalPoints: number;
  onRedeem: (pointsToDeduct: number) => void;
};

const RedeemPoints = ({ totalPoints, onRedeem }: RedeemPointsProps) => {
  const [showModal, setShowModal] = useState(false);
  const [walletNumber, setWalletNumber] = useState('');
  const [message, setMessage] = useState('');

  const handleRedeem = (amount: number, cost: number) => {
    if (totalPoints < cost) {
      setMessage('❌ Not enough points.');
      return;
    }
    if (!/^01\d{8,9}$/.test(walletNumber)) {
      setMessage('⚠️ Please enter a valid TNG eWallet number.');
      return;
    }

    onRedeem(cost);
    setMessage(`✅ RM${amount} will be sent to ${walletNumber} within 3 working days.`);
  };

  return (
    <>
      <button
        className="bg-yellow-500 text-white px-4 py-2 rounded mt-4"
        onClick={() => {
          setMessage('');
          setShowModal(true);
        }}
      >
        Redeem Points
      </button>

      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-2">Redeem to TNG eWallet</h2>
            <input
              type="text"
              placeholder="Enter eWallet number"
              className="border border-gray-300 rounded px-3 py-2 mb-4 w-full"
              value={walletNumber}
              onChange={(e) => setWalletNumber(e.target.value)}
            />
            <div className="flex flex-col gap-2">
              <button
                onClick={() => handleRedeem(5, 500)}
                className="bg-green-600 text-white py-2 px-4 rounded"
              >
                RM5 for 500 points
              </button>
              <button
                onClick={() => handleRedeem(10, 950)}
                className="bg-green-600 text-white py-2 px-4 rounded"
              >
                RM10 for 950 points
              </button>
            </div>
            {message && <p className="text-sm mt-3">{message}</p>}
            <button
              className="mt-4 text-sm text-blue-600 hover:underline"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default RedeemPoints;
