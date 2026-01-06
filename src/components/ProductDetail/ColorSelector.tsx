import { Check } from "lucide-react";

const ColorSelector = ({ colors, selectedColor, setSelectedColor }: any) => (
    <div className="flex flex-wrap gap-2 md:gap-3">
        {colors.map((color: any) => (
            <button
                key={color.name}
                onClick={() => setSelectedColor(color.name)}
                className={`group relative transition-all duration-300 ${selectedColor === color.name ? 'scale-110' : ''
                    }`}
            >
                <div
                    className={`w-10 h-10 md:w-12 md:h-12 rounded-full transition-all duration-300
          ${selectedColor === color.name
                            ? 'ring-2 md:ring-3 ring-pehnava-primary ring-offset-2'
                            : 'ring-1 ring-pehnava-border hover:ring-pehnava-primary/50'
                        }
          ${color.name === 'White' ? 'border border-pehnava-border' : ''}`}
                    style={{ backgroundColor: color.code }}
                >
                    {selectedColor === color.name && (
                        <div className="w-full h-full flex items-center justify-center">
                            <Check
                                className={`w-4 h-4 md:w-6 md:h-6 ${color.name === 'White'
                                    ? 'text-pehnava-primary'
                                    : 'text-white'
                                    }`}
                            />
                        </div>
                    )}
                </div>
            </button>
        ))}
    </div>
);

export default ColorSelector;