const ProgressBar = (props) => {
	const { bgcolor, color, total, current } = props;

	const containerStyles = {
		height: 6,
		width: '90%',
		backgroundColor: bgcolor,
		borderRadius: 5,
		margin: 2,
	};

	const fillerStyles = {
		height: '100%',
		width: `${(100 / total) * current}%`,
		backgroundColor: color,
		borderRadius: 'inherit',
	};

	return (
		<div style={containerStyles}>
			<div style={fillerStyles}></div>
		</div>
	);
};

export default ProgressBar;
