function handleSuccessResponse(payload) {
	return {
		success: true,
		error: null,
		data: payload,
	};
}

function handleErrorResponse(payload) {
	return {
		success: false,
		error: payload,
		data: null,
	};
}

module.exports = {
	handleSuccessResponse,
	handleErrorResponse,
};
