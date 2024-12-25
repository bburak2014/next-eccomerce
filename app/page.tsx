// main login page

'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function LoginPage() {
	const [credentials, setCredentials] = useState({ username: '', password: '' });
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	interface Credentials {
		username: string;
		password: string;
	}

	interface ChangeEvent {
		target: {
			name: string;
			value: string;
		};
	}

	const handleChange = useCallback((e: ChangeEvent) => {
		const { name, value } = e.target;
		setCredentials((prev: Credentials) => ({ ...prev, [name]: value }));
		setError('');
	}, []);

	const validateInputs = useCallback(() => {
		if (!credentials.username || !credentials.password) {
			setError('Username and password are required');
			return false;
		}
		return true;
	}, [credentials]);

	const handleLogin = useCallback(async () => {
		if (!validateInputs()) return;

		setLoading(true);
		try {
			const res = await fetch('/api/login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(credentials),
			});

			if (res.ok) {
				router.push('/products');
			} else {
				const data = await res.json();
				setError(data.message || 'Login failed');
				setLoading(false);

			}
		} catch {
			setError('An error occurred');
			setLoading(false);

		} 
	}, [credentials, validateInputs, router]);


	return (
		<div className="flex items-center justify-center min-h-screen">
			<div className="hidden lg:flex w-full h-full min-h-screen lg:w-[58%] flex-col p-10 gap-27 bg-background">
				<Image className='' src="/images/logo.png" alt="Logo" width={234} height={46} priority/>
				<div className='flex items-center flex-col gap-16'>
					<Image src="/images/Frame.png" alt="Frame" width={411} height={411} />
					<div className='flex flex-col gap-6'>
						<p className="font-bold text-2rem leading-primary text-primary">Let Free Your Creativity with
							Our Intuitive Content Creator
						</p>
						<p className='font-base text-base leading-secondary text-secondary'>No design degree is required! Effortlessly craft and design stunning and captivating content using our user-friendly creative editor. With our drag-and-drop technology, anyone can create amazing marketing materials in.</p>
					</div>
				</div>
			</div>
			<div className="flex w-full h-full min-h-screen lg:w-[42%] p-10 justify-center bg-foreground">
				<div className="w-full gap-8 flex flex-col max-w-form relative top-[23vh] h-min">
					<div className='flex flex-col items-center px-4 gap-4'>
						<p className="font-bold text-2rem leading-primary text-primary text-center">Welcome Octopus!
						</p>
						<p className="font-base text-sm leading-tertiary text-tertiary text-center">Manage your smart signage, watch your company grow.
						</p>
					</div>
					<div>
						<div className='flex flex-col gap-2  mb-4 '>
							<label className='text-sm font-medium text-primary leading-5'>E-mail Address*</label>
							<input
								type="text"
								name="username"
								placeholder="Enter your e-mail address"
								value={credentials.username}
								onChange={handleChange}
								className="w-full px-4 py-3 border rounded-lg bg-inputBg focus:outline-none focus:border-green "
							/>
						</div>
						<div className='flex flex-col gap-2  mb-3'>
							<label className='text-sm font-medium text-primary leading-5'>Password*</label>

							<input
								type="password"
								name="password"
								placeholder="Enter you password"
								value={credentials.password}
								onChange={handleChange}
								className="w-full px-4 py-3 border rounded-lg  bg-inputBg focus:outline-none focus:border-green"
							/>
						</div>
						<div className='flex gap-2 items-center  mb-8'>

							<input
								type="checkbox"
								name="remember"
								value={credentials.password}
								onChange={handleChange}
								className="w-5 h-5 border border-[#CBD5E1] rounded-[4px] focus:outline-none checked:bg-green-500 transition duration-200 ease-in-out"
							/>

							<label className='text-sm font-medium text-primary leading-5'>Remember Me?</label>

						</div>
						{error && <p className="text-red-500">{error}</p>}
						<button
							onClick={handleLogin}
							className="w-full p-3 bg-green text-sm text-white rounded-lg font-medium text-center"
							disabled={loading}
						>
							{loading ? 'Loading...' : 'Login'}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}