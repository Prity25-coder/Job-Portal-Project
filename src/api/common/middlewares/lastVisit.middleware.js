const setLastVisit = (req, res, next) => {
    // If cookie is set, then add a local variable with last visit time ;
    if (req.cookies.lastVisit) {
      res.locals.lastVisit = new Date(req.cookies.lastVisit).toLocaleString();
    }
  
    // when user is visiting first time
    res.cookie("lastVisit", new Date().toISOString(), {
      maxAge: 2 * 24 * 60 * 60 * 1000, // 2 days
    });
  
    return next();
  };
  
  export default setLastVisit;
  