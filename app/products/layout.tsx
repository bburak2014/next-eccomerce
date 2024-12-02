
import Navbar from '@/components/Navbar';
import { fetchMe } from '@/utils/api';
import { UserProvider } from '../context/UserContext';
import { ProductProvider } from '../context/ProductCartContext';

interface UserData {
	id: number;
	firstName: string;
	lastName: string;
}


export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const userData = await fetchMe() as UserData;
   	return (
		<UserProvider userData={userData}   >
			<ProductProvider>
				<main className='h-full'>
					<Navbar />
					{children}
				</main>
			</ProductProvider>
		</UserProvider>
	);
}
