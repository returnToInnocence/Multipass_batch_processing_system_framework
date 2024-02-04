import {isAfter} from './timeUtil';

// 先来先服务算法判定方式
const fifo = processes => {
  return processes.sort((process1, process2) =>
    isAfter(process1.startTime, process2.startTime)
  );
};

// 当前最短进程优先算法判定方式（这里考虑到会出现阻塞后调用其他进程，因此需要进行更改）
const spf = processes => {
  return processes.sort((process1, process2) =>
    (process1.serviceTime - process1.haveRunnedTime) -
    (process2.serviceTime - process2.haveRunnedTime)
  );
};

// 选择进程调度算法
export const getSortedprocesses = (processes, pickedAlgorithm) => {
  switch (pickedAlgorithm) {
    case 'FIFO':
      return fifo(processes);

    case 'SPF':
      return spf(processes);

    // 默认还是要使用先来先服务算法
    default:
      return fifo(processes);
  }
};
