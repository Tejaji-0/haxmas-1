type ShopItem = {
	id: string;
	name: string;
	icon: string;
	baseCost: number;
	cookiesPerSecond: number;
	count: number;
};

type ShopProps = {
	cookies: number;
	items: ShopItem[];
	onPurchase: (itemId: string) => void;
};

export default function Shop({ cookies, items, onPurchase }: ShopProps) {
	const calculateCost = (baseCost: number, count: number) => {
		return Math.floor(baseCost * Math.pow(1.15, count));
	};

	return (
		<div className="bg-green-900 bg-opacity-70 backdrop-blur-sm rounded-3xl px-8 py-6 shadow-2xl border-4 border-green-200 max-w-md w-full">
			<h2 className="text-4xl font-bold text-yellow-100 mb-6 text-center">🛒 Cookie Shop</h2>
			
			<div className="space-y-4">
				{items.map((item) => {
					const cost = calculateCost(item.baseCost, item.count);
					const canAfford = cookies >= cost;
					
					return (
						<button
							key={item.id}
							onClick={() => canAfford && onPurchase(item.id)}
							disabled={!canAfford}
							className={`w-full p-4 rounded-xl border-2 transition-all ${
								canAfford
									? 'bg-red-700 bg-opacity-60 border-red-300 hover:bg-red-600 hover:scale-105 cursor-pointer'
									: 'bg-gray-700 bg-opacity-40 border-gray-500 cursor-not-allowed opacity-50'
							}`}
						>
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-3">
									<span className="text-4xl">{item.icon}</span>
									<div className="text-left">
										<p className="text-lg font-bold text-white">{item.name}</p>
										<p className="text-sm text-green-200">+{item.cookiesPerSecond} cookies/sec</p>
									</div>
								</div>
								<div className="text-right">
									<p className="text-xl font-bold text-yellow-200">{cost} 🍪</p>
									<p className="text-xs text-gray-200">Owned: {item.count}</p>
								</div>
							</div>
						</button>
					);
				})}
			</div>
		</div>
	);
}
