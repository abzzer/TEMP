import { Link, useParams } from 'react-router-dom';
import { MainContentContainer } from './MainContent';
import { useQuery } from '@tanstack/react-query';
import { fetchUserByID } from '@/api/user';
import _ from 'lodash';
import { Button } from './ui/button';

export default function ProfileSection() {
	const { userID } = useParams();
	const currentUserID = localStorage.getItem('UserID');

	const {
		data: userData,
		isLoading,
		error,
	} = useQuery({
		queryKey: [`user_${userID}`],
		queryFn: () => fetchUserByID(userID),
	});

	if (isLoading) {
		return <p>Loading...</p>;
	}

	if (error) {
		return <p>Error fetching user</p>;
	}

	return (
		<MainContentContainer>
			{/* USER COVER AND PROFILE AREA */}
			<div className='relative p-3'>
				{/* cover photo */}
				<div>
					<img
						className='w-full h-[12rem] object-cover object-center rounded-md'
						src={
							userData.cover.url.length > 0
								? userData.cover.url
								: '/default_cover.svg'
						}
						alt='Cover Photo'
					/>
					{/* empty space below cover photo */}
					<div className='h-16'></div>
				</div>
				{/* profile photo */}
				<div className='absolute bottom-3 left-6 size-[10rem]'>
					<img
						className='rounded-full'
						src={userData.profile.url}
						alt='Profile'
					/>
				</div>
			</div>

			{/* USER FULLNAME AND USERNAME AREA */}
			<div className='px-6 flex justify-between items-start'>
				<div>
					<h2 className='text-2xl font-semibold'>
						{_.startCase(`${userData.firstname} ${userData.lastname}`)}
					</h2>
					<p className='text-dark-500'>@{userData.username}</p>
					<p className='pt-5 text-dark-500'>{userData.bio}</p>
				</div>
				{userData._id === currentUserID ? (
					<Button variant='secondary'>
						<Link to={`/profile/edit/${currentUserID}`}>Edit Profile</Link>
					</Button>
				) : (
					<Button variant='secondary'>
						<Link to={`/chats/${userID}`}>Send Message</Link>
					</Button>
				)}
			</div>
		</MainContentContainer>
	);
}
