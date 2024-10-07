export function success_response(data = [], message, res) {
  return res.send({
    success: 1,
    message,
    details: data || [],
  });
}

export function error_response(error, res) {
  return res.send({
    success: 0,
    message: error.message,
  });
}
