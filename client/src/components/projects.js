import React, { Component } from 'react';
import './css/projects.css'
import '../models/Project.js'
class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user:"",
      projects: []
    };
  }
  

  componentDidMount(props) {
    const {userId} = this.props;

    fetch('/api/'+userId+'/projects')
      .then(res => res.json())
      .then(projects => this.setState({projects}, () => console.log('Projects fetched...', projects)));
  }

  render() {
    return (
      <div>
        <h2>Projects</h2>
        <ul>
        {this.state.projects.map(project => 
          <li key={project.id}>{project.title}</li>
        )}
        </ul>
      </div>
    );
  }
}

export default Projects;
