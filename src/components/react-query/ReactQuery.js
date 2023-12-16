import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { useQueries, useQuery } from 'react-query';

function ReactQuery() {
	// const [data, setData] = useState([]);
	// const [isLoading, setIsLoading] = useState(true);
	const fetchPost = (id) => {
		return axios.get(`https://my-json-server.typicode.com/typicode/demo/posts/${id}`);
	};
	const fetchPosts = () => {
		return axios.get(`https://my-json-server.typicode.com/typicode/demo/posts`);
	};
	// After react query
	const {
		data: posts,
		isLoading,
		isFetching,
		refetch,
	} = useQuery(
		['user-posts'],
		() => {
			return fetchPosts();
		},
		{
			cacheTime: 5000,
			// cacheTime -> time after which cached data expires
			// staleTime -> query will be fresh in this time and data will not be fetched, default 0
			// refetchOnMount: false || 'always' -> Query will refetch on mount or always
			// refetchOnWindowFocus -> Update when window focuses, default -> true, false || 'always'
			// Pooling
			// refetchInterval: 2000, -> fetch data after this interval
			// refetchIntervalInBackground: true ->
			// enabled -> false, onPress={refetch}
			// onSuccess: (data)=> { // make use of data }
			// onError: ()=> {}
			// Data transformation or filter
			select: (data) => {
				const posts = data?.data;
				return posts;
			},
			// Query by id -> Pass key differently
			// Parallel query -> invoke useQuery multiple time
		}
	);

	console.log(posts);
	const queryResults = useQueries(
		posts?.map((post) => {
			return {
				queryKey: ['user-post', post?.id],
				queryFn: () => fetchPost(post?.id),
			};
		})
	);
	console.log({ queryResults: queryResults[0]?.data?.data });

	// Dependent queries
	// We can use enabled to fetch data from one query and pass it to other react query for fetching data.
	// initialQuery
	// Pagination -> take pageNumber in useState, pass it in useQuery and increment page for fetching next page.
	// useQuery(['posts', pageNumber], ()=> fetchPost(pageNumber))
	//

	// Before
	// useEffect(() => {
	// axios.get('https://my-json-server.typicode.com/typicode/demo/posts').then((res) => {
	// 	setData(res.data);
	// 	setIsLoading(false);
	// });
	// }, []);

	// infinite query handler

	return (
		<View>
			<Text>Super Heros</Text>
			{isLoading ? (
				<ActivityIndicator color="green" size={16} />
			) : (
				<View>
					{posts?.map((el, i) => {
						return <Text key={i}>{el.title}</Text>;
					})}
				</View>
			)}
			{/* <Text>{JSON.stringify(queryResults)}</Text> */}
		</View>
	);
}

export default ReactQuery;
