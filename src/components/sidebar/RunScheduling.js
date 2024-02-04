import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as timeActions from '../../actions/timer';
import {DELAY} from '../../constants';

const RunScheduling = ({
  timeActions
}) => {
  let intervalID;

  return (
    <div className="ui grid">
      <button className="ui fluid huge button "
        onClick={() => {
          clearInterval(intervalID);
        }}>
        暂停
      </button>
      <div className='PositionBlock2'></div>
      <button className="ui primary huge fluid button"
        onClick={() => {
          intervalID = setInterval(timeActions.start, DELAY);
        }}>
        运行
      </button>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    timeActions: bindActionCreators(timeActions, dispatch)
  };
};

export default connect(null, mapDispatchToProps)(RunScheduling);
