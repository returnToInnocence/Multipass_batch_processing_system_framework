import {isAfter} from './timeUtil';

// 这里的jobs将会以数组的方式传入，因此都是调用数组的自带方法，
// 内部规则（回调）自己写

// 先来先服务比较job的方式，比大小
const fcfs = jobs =>
  jobs.sort((job1, job2) =>
    isAfter(job1.arrivialTime, job2.arrivialTime)
  );

// 最短作业优先比较job的方式，看减法结果，当然这个其实也可以比大小，
//只不过因为结构不同需要另起一个函数因此才会做差
const sjf = jobs =>
  jobs.sort((job1, job2) => job1.serviceTime - job2.serviceTime);

// 过滤掉所有未到达的作业，返回一个只包含已经到达的作业的新数组
export const getArrivedJobs = (jobs, now) =>
  jobs.filter(job => isAfter(now, job.arrivialTime) !== -1);


export const getNotArrivedJobs = (jobs, now) =>
  jobs.filter(job => isAfter(now, job.arrivialTime) === -1);

// 选择作业调度的方法
export const getSortedJobs = (jobs, pickedAlgorithm) => {
  switch (pickedAlgorithm) {
    case 'FCFS':
      return fcfs(jobs);

    case 'SJF':
      return sjf(jobs);

    // 默认的话就是直接使用先来先服务算法
    default:
      return fcfs(jobs);
  }
};
