

export const freeMemory = (memoryList, processName) => {
  // 先找要释放的内存位置在哪里
  const targetIndex = memoryList.findIndex(item =>
    item.occupant === processName
  );

  // 内存块的释放也要考虑，主要就是跟前面和后面的内存块有关系，因此拿出来
  const target = memoryList[targetIndex];
  const before = memoryList[targetIndex - 1];
  const after = memoryList[targetIndex + 1];

  // 内存块的排放规律，回收-进程 || 进程-回收 || 进程-回收-进程
  if (
    // 最开头，我要释放的位置后面是一个正在使用的进程的话咋办？
    (targetIndex === 0 && after.flag === 'occupied') ||
    // 前面进程在运行
    (before && before.flag === 'occupied' &&
    // 要回收的进程是最后一个
      targetIndex === memoryList.length - 1) ||
    // 要回收的在中间
    (before && before.flag === 'occupied' && after.flag === 'occupied')
  ) {
    return [
      ...memoryList.slice(0, targetIndex),
      {
        ...target,
        flag: 'hole',
        occupant: 'no'
      },
      ...memoryList.slice(targetIndex + 1)
    ];
  }

  // 空闲-回收-空闲，合并情况
  if (
    (before && before.flag === 'hole') &&
    (after && after.flag === 'hole')) {
    return [
      ...memoryList.slice(0, targetIndex - 1),
      {
        ...before,
        length: before.length + target.length + after.length
      },
      ...memoryList.slice(targetIndex + 2)
    ];
  }

  // 空闲-回收-[进程]，上合并
  if (
    (before && before.flag === 'hole') &&
    (!after || after.flag === 'occupied')) {
    return [
      ...memoryList.slice(0, targetIndex - 1),
      {
        ...before,
        length: before.length + target.length
      },
      ...memoryList.slice(targetIndex + 1)
    ];
  }

  // [进程]-回收-空闲，下合并
  if (
    (!before || before.flag === 'occupied') &&
    (after && after.flag === 'hole')) {
    return [
      ...memoryList.slice(0, targetIndex),
      {
        ...target,
        occupant: 'no',
        flag: 'hole',
        length: target.length + memoryList[targetIndex + 1].length
      },
      ...memoryList.slice(targetIndex + 2)
    ];
  }
};

// 要找到一个能够容纳给定长度的空闲内存块，并返回其在内存列表中的索引值
export const getFitHoleIndex = (memoryList, length) => {
  return memoryList.findIndex(item =>
    item.flag === 'hole' && item.length > length
  );
};

export const allocateMemory = (memoryList, length, processName) => {
  const fitHoleIndex = getFitHoleIndex(memoryList, length);
  if (fitHoleIndex === -1) return memoryList;

  const fitHole = memoryList[fitHoleIndex];

  return [
    ...memoryList.slice(0, fitHoleIndex),
    {
      occupant: processName,
      flag: 'occupied',
      startAddress: fitHole.startAddress,
      length: length
    },
    {
      occupant: 'no',
      flag: 'hole',
      startAddress: fitHole.startAddress + length,
      length: fitHole.length - length
    },
    ...memoryList.slice(fitHoleIndex + 1)
  ];
};
