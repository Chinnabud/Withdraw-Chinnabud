import { useState } from 'react'
import './App.css'  

function WithdrawalPage() {
  // ตั้งให้เงินเป็น10000
  const [balance, setBalance] = useState(10000);
  const [amount, setAmount] = useState('');
  const [withdrawHistory, setWithdrawHistory] = useState([]);

  // ฟังก์ชันตรวจสอบ และ การถอนเงิน
  const handleWithdraw = () => {
    const withdrawAmount = parseInt(amount, 10);
    
    // ตรวจสอบว่าเป็นตัวเลขไม่เกินยอดเงินคงที่เหลืออยู่
    if (isNaN(withdrawAmount) || withdrawAmount <= 0) {
      alert("กรุณากรอกจำนวนเงินที่ถูกต้อง");
      return;
    }
    if (withdrawAmount > balance) {
      alert("ไม่สามารถถอนเงินเกินจํานวนที่มีอยู่ในบัญชีได้");
      return;
    }
    if (balance - withdrawAmount < 1) {
      alert("ไม่สามารถถอนเงินจนหมดบัญชีได้ จะต้องมีเงินเหลืออย่างน้อย 1 บาท");
      return;
    }

    // แจ้งเตือนงินคงเหลือและประวัติการถอน
    const newBalance = balance - withdrawAmount;
    setBalance(newBalance);
    setWithdrawHistory([
      { amount: withdrawAmount, balance: newBalance },
      ...withdrawHistory,
    ]);
    setAmount(''); // รีเซ็ตเงิน
  };

  // เพิ่มเงินในการกดปุ่ม
  const handlePresetWithdraw = (value) => {
    setAmount(value);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-9">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-3xl">
        
        <div className="bg-amber-50 shadow-md rounded-lg p-2">
          <h2 className="text-xl  font-bold mb-2">ระบบถอนเงิน</h2>
          <p className="text-lg mb-4">ยอดเงินคงเหลือ: <span className="font-semibold">{balance} บาท</span></p>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            {[100, 500, 1000, 5000].map((value) => (
              <button
                key={value}
                className="bg-emerald-700 text-white py-2 rounded-lg hover:bg-emerald-900 transition"
                onClick={() => handlePresetWithdraw(value)}
              >
                ถอน {value} บาท
              </button>
            ))}
          </div>
          
          <input
            type="number"
            className="w-full p-2 border border-gray-300 rounded mb-4"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="จำนวนเงินที่ต้องการถอน"
          />
          
          <button
            className="w-full bg-rose-500 text-white py-2 rounded-lg hover:bg-rose-700 transition"
            onClick={handleWithdraw}
          >
            ถอนเงิน
          </button>
        </div>
        
        <div className="bg-amber-50 shadow-md rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">ประวัติการถอนเงิน</h2>
          
          {/* ส่วนประวัติการถอนเงินแบบเลื่อนได้ */}
          <div className="overflow-y-scroll  h-64">
            {withdrawHistory.length > 0 ? (
              <ul className="space-y-2">
                {withdrawHistory.map((entry, index) => (
                  <li key={index} className="flex justify-between border-b py-2">
                    <span>ถอน: {entry.amount} บาท</span>
                    <span>คงเหลือ: {entry.balance} บาท</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">ไม่มีประวัติการถอนเงิน</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default WithdrawalPage;
