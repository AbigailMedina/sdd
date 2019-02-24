const express = require('express');

const app = express();

app.get('/api/:userId/projects', (req, res) => {
	var projects;
	if(req.params.userId=="medina2"){
		projects = [
		    {id: 1, title: 'SDD', user: 'medina2'},
		    {id: 2, title: 'OpSys', user: 'medina2'},
		    {id: 3, title: 'RCOS', user: 'medina2'},
		  ];
	}else{
		projects = [
		    {id: 1, title: 'comm', userId: 'other'},
		    {id: 2, title: 'psyc', userId: 'other'},
		    {id: 3, title: 'RCOS', userId: 'other'},
		  ];
	}
  

  res.json(projects);
});

const port = 5000;

app.listen(port, () => `Server running on port ${port}`);