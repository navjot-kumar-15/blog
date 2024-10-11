import fs from "fs";

export function success_response(res, message, data = []) {
  return res.send({
    success: 1,
    message,
    details: data || [],
  });
}

export function error_response(res, error) {
  return res.send({
    success: 0,
    message: error,
  });
}

export function invalid_response(message, res) {
  return res.send({
    success: 0,
    message: "Invalid credentials...",
  });
}

export function deleting_image(imagePath) {
  if (imagePath) {
    fs.unlink(imagePath, (err) => {
      if (err) console.error("Error deleting file:", err);
    });
  }
}
