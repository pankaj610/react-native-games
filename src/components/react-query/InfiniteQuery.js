import React from 'react';
import { View, Button, Text } from 'react-native';
import { useInfiniteQuery } from 'react-query';
import axios from 'axios';

const fetchPosts = ({ pageParam = 1 }) => {
	return axios.get(
		`https://my-json-server.typicode.com/typicode/demo/posts?_limit=2&_page=${pageParam}`
	);
};

function InfiniteQuery() {
	const { data, isLoading, isError, error, fetchNextPage } = useInfiniteQuery(
		['posts'],
		fetchPosts,
		{
			getNextPageParam: (_lastPage, pages) => {
				if (pages.length < 3) {
					return pages.length + 1;
				} else {
					return undefined;
				}
			},
		}
	);
	console.log({ data });

	return (
		<View>
			{data?.pages?.map((group, i) => {
				return (
					<React.Fragment key={i}>
						{group?.data?.map((post) => {
							return <Text key={post?.id}>{post.title}</Text>;
						})}
					</React.Fragment>
				);
			})}
			<Button title="Fetch More" onPress={fetchNextPage} />
		</View>
	);
}

export default InfiniteQuery;
