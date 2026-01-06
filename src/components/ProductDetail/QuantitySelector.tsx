import { Minus, Plus } from "lucide-react";

const QuantitySelector = ({ quantity, onChange }: any) => (
    <div className="flex items-center gap-2 md:gap-3">
        <button
            onClick={() => onChange(-1)}
            disabled={quantity <= 1}
            className="p-2 md:p-3 bg-white rounded-lg md:rounded-xl ring-1 ring-pehnava-border transition-all active:scale-95"
        >
            <Minus className="w-4 h-4 md:w-5 md:h-5 text-pehnava-charcoal" />
        </button>

        <span className="px-4 py-2 md:px-8 md:py-3 bg-white rounded-lg md:rounded-xl ring-1 ring-pehnava-border font-bold text-base md:text-lg min-w-[3rem] md:min-w-[4rem] text-center">
            {quantity}
        </span>

        <button
            onClick={() => onChange(1)}
            disabled={quantity >= 10}
            className="p-2 md:p-3 bg-white rounded-lg md:rounded-xl ring-1 ring-pehnava-border transition-all active:scale-95"
        >
            <Plus className="w-4 h-4 md:w-5 md:h-5 text-pehnava-charcoal" />
        </button>
    </div>
);

export default QuantitySelector;