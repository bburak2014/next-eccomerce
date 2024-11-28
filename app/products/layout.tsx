
import Navbar from '@/components/navbar';
export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (

		<main className='h-screen'>
			<Navbar />
			{children}
		</main>
	);
}
