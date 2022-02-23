function ipop(arr, index) {
  return arr.splice(index, 1)[0];
}

module.exports = {
  ipop,
};
