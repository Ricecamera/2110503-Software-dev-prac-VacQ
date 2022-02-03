//@desc     Get all hospitals
//@route    GET /api/v1.hospitals
//@accress  Public
exports.getHospitals = (req, res, next) => {
	// res.send('<h1>Hello from express</h1>');
	// res.send({ name: 'Brad' });
	// res.json({ name: 'Brad' });
	// res.sendStatus(400);
	// res.status(400).json({ success: false });
	res.status(200).json({ success: true, msg: 'Show all hospitals' });
};

//@desc     Get single hospital
//@route    GET /api/v1.hospitals/:id
//@accress  Public
exports.getHospital = (req, res, next) => {
	res
		.status(200)
		.json({ success: true, msg: `Show hospital ${req.params.id}` });
};

//@desc     Create new hospital
//@route    POST /api/v1.hospitals
//@accress  Private
exports.createHospital = (req, res, next) => {
	res.status(200).json({ success: true, msg: 'Create a new hospital' });
};

//@desc     Update hospital
//@route    PUT /api/v1.hospitals/:id
//@accress  Private
exports.updateHospital = (req, res, next) => {
	res
		.status(200)
		.json({ success: true, msg: `Update hospital ${req.params.id}` });
};

//@desc     Delete hospital
//@route    DELETE /api/v1.hospitals/:id
//@accress  Private
exports.deleteHospital = (req, res, next) => {
	res
		.status(200)
		.json({ success: true, msg: `Delete hospital ${req.params.id}` });
};
