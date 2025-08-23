 npx builder.io@latest code --url "cgen://completion/cgen-29fe60d11e954fc3a299a39e0de74ace" 


 useMutation & useQuery

 The useMutation hook in React Query is used to perform and manage asynchronous write operations—known as mutations—such as creating, updating, or deleting data on the server. Unlike useQuery which is meant for fetching data, useMutation is designed specifically for operations that change or modify data.

 It helps manage side effects during the mutation lifecycle with convenient callbacks:

    onMutate before the mutation starts,

    onError if it fails,

    onSuccess if it succeeds,

    onSettled regardless of success or failure.




## What usePrefetchQuery / prefetchQuery does:
    Pre-fetches query data and stores it in React Query's cache.

    Speeds up the user experience by avoiding loading spinners or delays when navigating or interacting with parts of the app that need the data.

    Unlike useQuery, prefetchQuery is not a hook but an imperative function that you call to load data early.

    It fetches the data but does not cause component re-renders like useQuery would.

    Commonly used in scenarios like hovering over a link, pre-loading data for upcoming pages, or preparing data for modals/dialogs.

            ```javascript
                Example Usage
                const queryClient = useQueryClient();

                const prefetchTodos = async () => {
                await queryClient.prefetchQuery({
                    queryKey: ['todos'],
                    queryFn: fetchTodos,
                    staleTime: 60000, // optional: data stays fresh for 1 minute
                });
                };

                // Call prefetchTodos before user navigates or interacts
                <button onMouseEnter={prefetchTodos}>Show Todos</button>
            ```
            Here, the todos data is fetched and cached when the user hovers the button, so when a component later calls useQuery(['todos']), the data is immediately available and no loading spinner is shown.