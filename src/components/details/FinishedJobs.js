import React from 'react';
import {connect} from 'react-redux';

import Table from './Table';

const FinishedJobs = ({finishedJobs}) => {
  return (
    <div className="sixteen wide column">
      <h4> 已完成的作业: </h4>
      <Table data={finishedJobs} />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    finishedJobs: state.finishedJobs
  };
};

export default connect(mapStateToProps)(FinishedJobs);
