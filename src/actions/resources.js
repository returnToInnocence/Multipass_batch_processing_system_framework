// 上面的是参数，同时作为后面return中的属性名
export const allocate = ({
  memory,
  tapeDriver,
  processName
}) => {
  return {
    type: 'ALLOCATE_RESOURCES',
    memory,
    tapeDriver,
    processName
  };
};

export const free = ({
  tapeDriver,
  processName
}) => {
  return {
    type: 'FREE_RESOURCES',
    tapeDriver,
    processName
  };
};
