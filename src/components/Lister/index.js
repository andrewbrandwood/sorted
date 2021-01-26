import React, { useEffect, useState } from 'react';
import getPosts from '../../services/posts';
import Post from './Post'
import CreatePost from './CreatePost';

const Lister = () => {

	const [loading, setLoading] = useState(true);
	const [allPosts, setPosts] = useState([]);

	const onDeletePost = (id) => {
		const newPosts = [...allPosts]
		const item = newPosts.id === id;
		newPosts.splice(item, 1)
		setPosts(newPosts)
	}

	useEffect(() => {
		getPosts().then(data => {
			setLoading(false);
			setPosts(data);
		});
	}, []);

	return (
		<>
			{ 
				loading ? <div>Loading...</div> : (
					<>
						{ allPosts.length <= 0 ? 
							<>
								<div>No posts available...</div>
								<CreatePost />
							</>

							:
							<>
								{allPosts.map((data, index) => <Post {...data} key={index} onDelete={() => onDeletePost(data.id)} />)}
								<CreatePost />
							</>
							}
					</>
				)
			}
		</>
	)

	

	const onCreatePost = post => {
		// TODO: implement
	}

	// TODO: implement render method, using Post and CreatePost e.g.
	//				...
	// 				<div className="postList">
	//					...
	//					<CreatePost />
	// 				</div>
	//				...


};

export default Lister;