export function errorHandler(error, req, res) {
  const statusCode =
    res.statusCode && res.statusCode !== 200
      ? res.statusCode
      : 500;
  const message = error.message || "Internal server error.";

  res.status(statusCode).json({
    message,
  });
}
