const resSuccessHelpers = (res, body, code = 200) => {
  return res.status(code).json({
    success: true,
    ...body,
  });
};

const resErrorHelpers = (res, body, code) => {
  return res.status(code || 500).json({
    success: false,
    ...body,
  });
};

module.exports = {
  resSuccessHelpers,
  resErrorHelpers,
};
