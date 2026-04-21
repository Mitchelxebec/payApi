import TransactionRow from "../TransactionRow";

const TransactionLedger = () => {
  return (
    <div className="perspective-1000 w-full">
      <div className="bg-[#1c1c24] border border-gray-800 rounded-2xl p-6 md:p-8 shadow-2xl transition-all duration-500 hover:rotate-0 lg:rotate-3 lg:-rotate-y-6">
        <div className="flex justify-between items-center mb-8">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
            <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
          </div>
          <span className="text-[10px] font-mono text-gray-500 tracking-widest uppercase">
            Transaction_Ledger_v1
          </span>
        </div>

        <div className="flex flex-col gap-4">
          <TransactionRow
            name="Sentiment Analysis API"
            address="0x71C...392b"
            amount="0.00042 ETH"
            status="Confirmed"
            accentColor="#60a5fa"
            icon="{}"
          />
          <TransactionRow
            name="Image Gen v4"
            address="0x4aB...c811"
            amount="0.00120 ETH"
            status="Confirmed"
            accentColor="#8884FF"
            icon="🖼️"
            isActive
          />
          <TransactionRow
            name="LLM Translation"
            address="0x52f...e589"
            amount="0.00008 ETH"
            status="Pending"
            accentColor="#4b5563"
            icon="文A"
          />
        </div>
      </div>
    </div>
  );
};

export default TransactionLedger;
