/* eslint no-restricted-globals: 1 */
console.log("My custom service worker");
self.addEventListener("notificationclick", function(event) {
  const notification = event.notification;
  const action = event.action;

  console.log("notificationclick sw event: ", event);

  if (action === "confirm") {
    console.log("Confirm was chosen in sw");
    notification.close();
  } else {
    console.log(action);
    notification.close();
  }
});

self.addEventListener("notificationclose", function(event) {
  console.log("notification close from sw", event);
});
