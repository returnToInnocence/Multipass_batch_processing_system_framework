import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actions from '../../actions/scheduling';
import Picker from './Picker';

const AlgorithmPicker = ({
  pickAlgorithm,
  actions
}) => {
  return (
    <div className="ui grid">
      <Picker
        currentAlgo={pickAlgorithm.jobAlgorithm}
        title="作业调度算法"
        choices={['先来先服务', '短作业优先']}
        onChange={actions.pickJobAlgo}
      />

      <div className='PositionBlock3'></div>

      <Picker
        currentAlgo={pickAlgorithm.processAlgorithm}
        title="进程调度算法"
        choices={['先来先服务', '短作业优先']}
        onChange={actions.pickProcessAlgo}
      />

      <Picker
        currentAlgo={pickAlgorithm.memoryAlgorithm}
        title="内存分配算法"
        choices={['首次适应算法']}
        onChange={actions.pickMemoryAlgo}
      />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    pickAlgorithm: state.pickAlgorithm
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AlgorithmPicker);
