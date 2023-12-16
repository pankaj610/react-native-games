import React from 'react';
import { Button, Text, View } from 'react-native';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import axios from 'axios';

const addPost = (post) => {
	return axios.post('https://my-json-server.typicode.com/typicode/demo/posts', post);
};

const fetchPosts = () => {
	return axios.get('https://my-json-server.typicode.com/typicode/demo/posts');
};

function MutationQuery() {
	const { data, refetch, isFetching, isLoading } = useQuery('posts', fetchPosts);
	const queryClient = useQueryClient();
	const { mutate, isError, error } = useMutation(addPost, {
		onSuccess: (createdPostData) => {
			// queryClient.invalidateQueries('posts'); // not recommended as updated object comes in response
			console.log({ data: createdPostData.data });
			const previousPostData = queryClient.getQueriesData('posts');
			queryClient.setQueriesData('posts', (oldPostsData) => {
				console.log(createdPostData?.data?.id + 1);
				return {
					...oldPostsData,
					data: [
						...oldPostsData?.data,
						{ id: createdPostData?.data?.id + 1, ...createdPostData?.data },
					],
				};
			});
			return {
				previousPostData,
			};
		},
		onError: (_error, _post, _context) => {
			// queryClient.invalidateQueries('posts');
			queryClient.setQueriesData('posts', _context?.previousPostData);
		},
		onSettled: () => {
			queryClient.invalidateQueries('posts');
		},
	});
	console.log({ isFetching, isLoading }, new Date().toGMTString());

	return (
		<View>
			<Text>MutationQuery</Text>
			{data?.data?.map((el) => (
				<Text key={el.id}>{el.title}</Text>
			))}
			<Button
				title="Create Post"
				onPress={() => {
					const post = { title: 'First Post' };
					mutate(post);
				}}
			/>
		</View>
	);
}

export default MutationQuery;
