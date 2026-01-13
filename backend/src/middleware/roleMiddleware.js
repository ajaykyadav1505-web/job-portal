exports.checkAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ msg: "Admin only" });
  }
  next();
};

exports.checkCandidate = (req, res, next) => {
  if (req.user.role !== "candidate") {
    return res.status(403).json({ msg: "Candidate only" });
  }
  next();
};
