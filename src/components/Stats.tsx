'use client';

import CountUp from './ui/CountUp';

const stats = [
	{
		label: 'Estudiantes graduados',
		value: 40,
		suffix: 'k',
	},
	{
		label: 'Programas educativos',
		value: 50,
		suffix: '+',
	},
	{
		label: 'Docentes',
		value: 30,
		suffix: '',
	},
	{
		label: 'Satisfacción',
		value: 100,
		suffix: '%',
	},
];

export default function Stats() {
	return (
		<section className="w-full bg-gradient-to-br from-yellow-100 via-orange-100 to-pink-100 py-16">
			<div className="container mx-auto flex flex-row flex-wrap items-stretch justify-center gap-8 md:gap-12 lg:gap-20">
				{stats.map((stat) => (
					<div
						key={stat.label}
						className="relative flex max-w-[240px] min-w-[200px] flex-col items-center justify-center bg-white/80 px-10 py-10 shadow-lg"
					>
						<div className="flex h-full flex-col items-center justify-center">
							<div className="flex w-full items-center justify-center gap-2">
								<CountUp
									from={0}
									to={stat.value}
									separator=","
									direction="up"
									duration={1.2}
									className="font-orbitron text-center text-5xl font-extrabold text-orange-500 drop-shadow-lg"
								/>
								<span className="font-orbitron text-center text-3xl font-extrabold text-orange-500 drop-shadow-lg">
									{stat.suffix}
								</span>
							</div>
							<span className="mt-4 w-full text-center text-lg font-semibold whitespace-nowrap text-gray-700">
								{stat.label}
							</span>
						</div>
					</div>
				))}
			</div>
		</section>
	);
}
