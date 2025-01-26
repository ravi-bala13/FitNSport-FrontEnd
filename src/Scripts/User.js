const User = (() => {
  let _name;

  const _setUserName = (userName) => {
    _name = userName;
  };

  const _getUserName = () => {
    return _name;
  };

  return {
    setUserName: _setUserName,
    getUserName: _getUserName,
  };
})();

export default User;
