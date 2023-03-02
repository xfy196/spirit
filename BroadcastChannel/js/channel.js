function createChannel(name) {
  const channel = new BroadcastChannel(name);
  setMsg("嘿", channel);
  window.addEventListener("unload", () => {
    setMsg("哦吼", channel);
  });
  channel.addEventListener("message", (e) => {
    if (e.data.msg === "嘿") {
      setMsg("嗨", channel);
      console.log("嘿");
    } else if (e.data.msg === "嗨") {
      console.log("嗨");
    } else if (e.data.msg === "哦吼") {
      console.log("哦吼");
    }
  });
  return channel;
}
/**
 * @description:
 * @author 小小荧 <xfy196@outlook.com>
 * @param {string} [msg]
 * @param {BroadcastChannel} [channel]
 * @return {void}
 * @date 2023-03-02 09:57
 */
function setMsg(msg, channel) {
  channel.postMessage({
    msg,
  });
}
