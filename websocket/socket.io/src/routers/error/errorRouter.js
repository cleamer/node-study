const router = require('express').Router();

router.use((req, res, next) => {
  const notFoundError = new Error(`${req.method} ${req.url} NotFound`);
  notFoundError.status = 404;
  next(notFoundError);
});
router.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== ' production' ? err : {};
  res.status(err.status || 500).render('error');
});

module.exports = router;
