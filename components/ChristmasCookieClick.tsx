import Image from "next/image";

type ChristmasCookieClickProps = {
	onClick: () => void;
};

export default function ChristmasCookieClick({ onClick }: ChristmasCookieClickProps) {
	return (
		<button 
			onClick={onClick}
			className="transition-transform hover:scale-105 active:scale-95 cursor-pointer"
		>
			<Image 
				src="/cookie.svg" 
				width={256} 
				height={256} 
				alt="Christmas Cookie"
				priority
			/>
		</button>
	)
}
