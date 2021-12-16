import { useState, useEffect, useCallback, useRef } from 'react';

const useAsyncState = (initialState) => {
	const [currentQuestion, setCurrentQuestion] = useState(initialState);
	const resolveState = useRef();
	const isMounted = useRef(false);

	useEffect(() => {
		isMounted.current = true;

		return () => {
			isMounted.current = false;
		};
	}, []);

	useEffect(() => {
		if (resolveState.current) {
			resolveState.current(currentQuestion);
		}
	}, [currentQuestion]);

	const setAsyncCurrentQuestion = useCallback(
		(newState) =>
			new Promise((resolve) => {
				if (isMounted.current) {
					resolveState.current = resolve;
					setCurrentQuestion(newState);
				}
			}),
		[]
	);

	return [currentQuestion, setAsyncCurrentQuestion];
};

export default useAsyncState;
