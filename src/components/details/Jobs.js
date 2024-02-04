import React,{useContext, useEffect} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import context from '../../store/context';

import Table from './Table';
import {getArrivedJobs, getSortedJobs, getNotArrivedJobs} from '../../algorithm/jobScheduling';
import {getFitHoleIndex} from '../../algorithm/memoryAllocation';



import * as processesActions from '../../actions/processes';
import * as jobsActions from '../../actions/jobs';
import * as resourcesActions from '../../actions/resources';


function Jobs(props){
  const { JCB, setJCB } = useContext(context);
  const {
    jobs, now,
    pickAlgorithm, resources,
    jobsActions, processesActions, resourcesActions
  } = props;
    useEffect(() => {
      
      if (JCB.length){
        
        // 根据时间获取当前已经到达的作业序列
      const arriviedJobs = getArrivedJobs(JCB, now);
      // const notArriviedJobs = getNotArrivedJobs(JCB, now);
      console.log('arriviedJobs',arriviedJobs);
      
      // console.log(arriviedJobs);
      const sortedJobs = getSortedJobs(arriviedJobs, pickAlgorithm.jobAlgorithm);
        // console.log(sortedJobs);
      sortedJobs.forEach(job => {
        const request = {memory: job.memory, tapeDriver: job.tapeDriver};
  
        // IO设备不够用的话
        if (resources.tapeDriver < request.tapeDriver) return 0;
        // 内存不够用的话
        if (getFitHoleIndex(resources.memory, request.memory) === -1) return 0;
        setJCB(getNotArrivedJobs(JCB, now))

        // 满足上述条件的话就应该从作业队列里移除了
        jobsActions.removeJob(job.name);
        // 开始放到进程队列中
        processesActions.addProcess({
          ...job,
          startTime: now
        });
        // 分配内存
        resourcesActions.allocate({
          ...request,
          processName: job.name
        });
      });
      }
     
      
    }, [now])

    return (
      <div className="eight wide column">
        <h4>作业队列:</h4>
        <Table data={JCB} />
      </div>
    );
}

const mapStateToProps = state => {
  return {
    jobs: state.jobs,
    now: state.now,
    pickAlgorithm: state.pickAlgorithm,
    resources: state.resources
  };
};

const mapDispatchToProps = dispatch => {
  return {
    processesActions: bindActionCreators(processesActions, dispatch),
    jobsActions: bindActionCreators(jobsActions, dispatch),
    resourcesActions: bindActionCreators(resourcesActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Jobs);
