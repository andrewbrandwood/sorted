import React, { useEffect, useState } from 'react';
import getPosts from '../../services/posts';
import Post from './Post'
import CreatePost from './CreatePost';

const Lister = () => {

	const [loading, setLoading] = useState(true);
	const [allPosts, setPosts] = useState([]);

	const onDeletePost = (id) => {
		const newPosts = allPosts.filter(post =>  post.id !== id)
		setPosts(newPosts)
	}

	const onCreatePost = post => {
		const newPosts = [...allPosts]
		newPosts.push({...post})
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
								<CreatePost onCreate={post => onCreatePost(post)} />
							</>
							}
					</>
				)
			}
		</>
	)


};

export default Lister;