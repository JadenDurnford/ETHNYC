import React, { useState } from 'react'
import styles from '../styles/Home.module.css';

const ProjectView = (props) => {
  if (props.id && props.id.length > 0) {
    return (
      <div className={styles.projectview}>
        <h1>Project view for collection ID {props.id}</h1>
      </div>
    );
  }
  return (
    <div className={styles.projectview}>
      <h1>No collection selected.</h1>
    </div>
  )
};
export default ProjectView;