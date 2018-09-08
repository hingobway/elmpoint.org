module.exports = res => (code, error, log) => {
  res.status(code).json({ error });
  if (log) console.log(new Error(log));
};
