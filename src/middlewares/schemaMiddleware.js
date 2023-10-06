export function schemaMiddleware(schema) {
  return async (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      const errorMessage = error.details
        .map((detail) => detail.message)
        .join(", ");
      res.status(422).send(errorMessage);
    } else {
      res.locals.user = req.body;
      next();
    }
  };
}
