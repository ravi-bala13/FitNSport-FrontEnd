const AppHelper = (function () {
  const _getServerUrl = () => {
    return "https://fitnsportbackend.onrender.com";
  };

  const _fireEvent = (eventName) => {
    const event = new CustomEvent(eventName, {
      detail: { message: `${eventName} is activated!` },
    });
    window.dispatchEvent(event);
  };

  return {
    getServerUrl: _getServerUrl,
    firEvent: _fireEvent,
  };
})();

export default AppHelper;
