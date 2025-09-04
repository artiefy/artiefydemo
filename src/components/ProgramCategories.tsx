'use client';
import Link from 'next/link';

import type { Route } from 'next';

const categories = [
	{
		name: 'Diplomados y Cursos',
		slug: 'diplomados-cursos',
		color: 'bg-blue-100',
		icon: '📚',
	},
	{
		name: 'Carreras técnicas',
		slug: 'carreras-tecnicas',
		color: 'bg-green-100',
		icon: '🛠️',
	},
	{
		name: 'Tecnologías',
		slug: 'tecnologias',
		color: 'bg-yellow-100',
		icon: '💡',
	},
	{ name: 'Pregrados', slug: 'pregrados', color: 'bg-purple-100', icon: '🎓' },
	{ name: 'Posgrados', slug: 'posgrados', color: 'bg-pink-100', icon: '🏅' },
	{ name: 'Maestrías', slug: 'maestrias', color: 'bg-indigo-100', icon: '📖' },
	{ name: 'Doctorados', slug: 'doctorados', color: 'bg-red-100', icon: '🧑‍🔬' },
];

export default function ProgramCategories() {
	return (
		<section
			className="bg-gradient-to-br from-blue-900 to-blue-700 py-10 text-white"
			id="oferta"
		>
			<div className="container mx-auto text-center px-1 md:px-4 lg:px-8">
				<h2 className="mb-6 text-4xl font-extrabold drop-shadow-lg">
					Oferta Académica
				</h2>
				<p className="mb-8 max-w-3xl mx-auto text-lg text-blue-100">
					En CCOET ofrecemos diplomados, cursos, carreras técnicas laborales y
					alianzas educativas para que puedas homologar y avanzar en tus estudios
					profesionales, desde pregrados hasta postgrados. Descubre nuestra
					amplia oferta académica y elige el camino que impulse tu futuro.
				</p>
				<div className="flex flex-col items-center gap-8">
					<div className="flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-10">
						{categories.slice(0, 3).map((cat) => (
							<Link
								key={cat.slug}
								href={`/oferta/${cat.slug}` as Route}
								className={`flex w-40 transform flex-col items-center justify-center rounded-xl p-3 shadow-lg transition-all duration-300 hover:scale-105 ${cat.color} text-blue-900 hover:text-blue-800`}
							>
								<span className="mb-2 text-3xl">{cat.icon}</span>
								<span className="text-base font-bold">{cat.name}</span>
							</Link>
						))}
					</div>
					<div className="flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-10">
						{categories.slice(3, 6).map((cat) => (
							<Link
								key={cat.slug}
								href={`/oferta/${cat.slug}` as Route}
								className={`flex w-40 transform flex-col items-center justify-center rounded-xl p-3 shadow-lg transition-all duration-300 hover:scale-105 ${cat.color} text-blue-900 hover:text-blue-800`}
							>
								<span className="mb-2 text-3xl">{cat.icon}</span>
								<span className="text-base font-bold">{cat.name}</span>
							</Link>
						))}
					</div>
					<div className="flex justify-center gap-6 md:gap-8 lg:gap-10">
						{categories[6] && (
							<Link
								key={categories[6].slug}
								href={`/oferta/${categories[6].slug}` as Route}
								className={`flex w-40 transform flex-col items-center justify-center rounded-xl p-3 shadow-lg transition-all duration-300 hover:scale-105 ${categories[6].color ?? ''} text-blue-900 hover:text-blue-800`}
							>
								<span className="mb-2 text-3xl">
									{categories[6].icon ?? ''}
								</span>
								<span className="text-base font-bold">
									{categories[6].name ?? ''}
								</span>
							</Link>
						)}
					</div>
				</div>
			</div>
		</section>
	);
}
