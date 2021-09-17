export const pointToDegree = (point) => {
  const radians = Math.atan2(point.x, point.y);
  return (radians * 180) / Math.PI;
};

export const getAngle = (point) => {
  const magnitude = Math.sqrt(point.x * point.x + point.y * point.y);

  const unitVector = {
    x: point.x / magnitude,
    y: point.y / magnitude,
  };

  const angle = (180 - pointToDegree(unitVector)) % 360;

  return angle;
};
