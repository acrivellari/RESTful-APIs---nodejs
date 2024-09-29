const controller = (req, res) => { 
	if (req.query.id == '') {
		res.send('all');
	}
	else {
		res.send('user id: ' + req.query.id);
	}
}

module.exports = controller;
