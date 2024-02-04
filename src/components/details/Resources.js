import React from 'react';
import {connect} from 'react-redux';

import Table from './Table';

const Resources = ({
  resources
}) => {
  return (
    <div className="eight wide column">
      <div>
        <h3>内存:</h3>
        <Table data={resources.memory} />
        <p className="ui huge label">
          剩余可用IO设备数量:{resources.tapeDriver}
        </p>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    resources: state.resources
  };
};

export default connect(mapStateToProps)(Resources);
